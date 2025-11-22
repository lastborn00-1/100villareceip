import React, { useState, useEffect } from 'react';
import { ReceiptForm } from './components/ReceiptForm';
import { ReceiptTemplate } from './components/ReceiptTemplate';
import { ReceiptData, PaymentMethod } from './types';
import { GENERATE_RECEIPT_NUMBER, LANDLORD_INFO } from './constants';
import { generateWhatsAppMessage } from './services/geminiService';
import { MessageSquare, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    receiptNumber: GENERATE_RECEIPT_NUMBER(),
    tenantName: '',
    amount: 0,
    paymentDate: new Date().toISOString().split('T')[0],
    periodStart: '',
    periodEnd: '',
    roomNumber: '',
    paymentMethod: PaymentMethod.TRANSFER,
    notes: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Set default start date to today
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    if (!receiptData.periodStart) {
      setReceiptData(prev => ({
        ...prev,
        periodStart: today.toISOString().split('T')[0],
        periodEnd: nextYear.toISOString().split('T')[0]
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-receipt');
    if (!element) return;
    
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt-${receiptData.receiptNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try printing instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById('printable-receipt');
    if (!element) return;

    try {
      setIsDownloading(true);
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `Receipt-${receiptData.receiptNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerateMessage = async () => {
    setIsGenerating(true);
    const msg = await generateWhatsAppMessage(receiptData);
    setGeneratedMessage(msg);
    setIsGenerating(false);
    setShowModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    alert("Message copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar - No Print */}
      <nav className="bg-green-900 text-white p-4 shadow-md no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl font-serif font-bold">
               100
             </div>
             <div>
               <h1 className="text-lg font-bold leading-tight">{LANDLORD_INFO.houseName}</h1>
               <p className="text-xs text-green-200">Receipt Generator</p>
             </div>
          </div>
          <div className="text-xs text-green-200 hidden sm:block">
            Managed by {LANDLORD_INFO.name}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-8 gap-8 flex flex-col lg:flex-row">
        
        {/* Left Column: Form (No Print) */}
        <div className="w-full lg:w-1/3 no-print order-2 lg:order-1">
          <ReceiptForm 
            data={receiptData} 
            onChange={setReceiptData} 
            onPrint={handlePrint}
            onGenerateMessage={handleGenerateMessage}
            onDownloadPDF={handleDownloadPDF}
            onDownloadImage={handleDownloadImage}
            isGeneratingMessage={isGenerating}
            isDownloading={isDownloading}
          />
          
          <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800">
            <h3 className="font-bold mb-1 flex items-center gap-2">
              <span className="text-lg">💡</span> Tip
            </h3>
            <p>Use <strong>Save Image</strong> to quickly send the receipt via WhatsApp, or <strong>Save PDF</strong> for official record keeping.</p>
          </div>
        </div>

        {/* Right Column: Preview (Print Only Area) */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2 flex flex-col items-center">
          <div className="print-only w-full">
            <ReceiptTemplate data={receiptData} />
          </div>
        </div>
      </main>

      {/* Message Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 no-print">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
               <h3 className="font-bold flex items-center gap-2">
                 <MessageSquare className="w-4 h-4" />
                 Draft WhatsApp Message
               </h3>
               <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded">
                 <X className="w-5 h-5" />
               </button>
            </div>
            <div className="p-6">
              <textarea 
                className="w-full h-40 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                value={generatedMessage}
                onChange={(e) => setGeneratedMessage(e.target.value)}
              />
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                   Copy Text
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;