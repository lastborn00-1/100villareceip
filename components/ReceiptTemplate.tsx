import React from 'react';
import { ReceiptData, LandlordDetails } from '../types';
import { LANDLORD_INFO } from '../constants';
import { numberToWords } from '../utils/numberToWords';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

interface ReceiptTemplateProps {
  data: ReceiptData;
}

export const ReceiptTemplate: React.FC<ReceiptTemplateProps> = ({ data }) => {
  
  // Formatters
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '.....................';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div id="printable-receipt" className="w-full max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-2xl print:shadow-none print:p-0 relative overflow-hidden border-t-8 border-green-700">
      
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none z-0">
        <h1 className="text-[12rem] font-serif font-bold text-green-900 rotate-[-30deg] whitespace-nowrap">PAID</h1>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-gray-800 pb-6 mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-serif font-bold text-green-800 tracking-wide">{LANDLORD_INFO.houseName}</h1>
            <p className="text-sm text-gray-600 mt-1 font-medium uppercase tracking-widest">Rent Receipt</p>
          </div>
          <div className="text-right md:max-w-xs">
            <div className="flex items-start justify-end gap-2 text-gray-600 text-xs mb-1">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{LANDLORD_INFO.address}</span>
            </div>
             <div className="flex items-center justify-end gap-2 text-gray-600 text-xs mb-1">
              <Phone className="w-3 h-3" />
              <span>{LANDLORD_INFO.phone}</span>
            </div>
             <div className="flex items-center justify-end gap-2 text-gray-600 text-xs">
              <Mail className="w-3 h-3" />
              <span>{LANDLORD_INFO.email}</span>
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div>
            <span className="text-gray-500 text-xs uppercase font-bold tracking-wider block">Receipt No</span>
            <span className="font-mono font-bold text-lg text-gray-800">{data.receiptNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-500 text-xs uppercase font-bold tracking-wider block">Date</span>
            <span className="font-medium text-lg text-gray-800">{formatDate(data.paymentDate)}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 font-serif">
          
          {/* Tenant */}
          <div className="flex items-baseline border-b border-gray-300 pb-2">
            <span className="text-gray-500 font-sans text-sm uppercase font-bold w-32 flex-shrink-0">Received From:</span>
            <span className="flex-grow text-xl font-bold text-gray-900 px-2 capitalize">
              {data.tenantName || <span className="text-gray-300 italic">Tenant Name</span>}
            </span>
          </div>

          {/* Amount (Words) */}
          <div className="flex items-baseline border-b border-gray-300 pb-2">
            <span className="text-gray-500 font-sans text-sm uppercase font-bold w-32 flex-shrink-0">The Sum Of:</span>
            <span className="flex-grow text-lg text-gray-800 px-2 italic">
              {numberToWords(data.amount)}
            </span>
          </div>

          {/* Purpose */}
          <div className="flex items-baseline border-b border-gray-300 pb-2">
             <span className="text-gray-500 font-sans text-sm uppercase font-bold w-32 flex-shrink-0">Payment For:</span>
             <span className="flex-grow text-lg text-gray-800 px-2">
                Rent for <span className="font-bold">{data.roomNumber || '______'}</span> at {LANDLORD_INFO.houseName}
             </span>
          </div>

          {/* Period */}
           <div className="flex items-baseline border-b border-gray-300 pb-2">
             <span className="text-gray-500 font-sans text-sm uppercase font-bold w-32 flex-shrink-0">Period:</span>
             <span className="flex-grow text-lg text-gray-800 px-2">
                From <span className="font-bold text-black mx-1">{formatDate(data.periodStart)}</span> 
                To <span className="font-bold text-black mx-1">{formatDate(data.periodEnd)}</span>
             </span>
          </div>
        </div>

        {/* Totals Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t-2 border-gray-800">
           <div className="mb-6 sm:mb-0">
             <div className="flex items-center gap-3 bg-green-50 text-green-800 px-6 py-3 rounded-full border border-green-200">
                <CheckCircle className="w-5 h-5" />
                <span className="font-sans font-semibold text-sm uppercase tracking-wide">{data.paymentMethod}</span>
             </div>
           </div>

           <div className="text-center sm:text-right">
              <span className="block text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Total Amount Paid</span>
              <span className="block text-4xl font-bold text-green-700 font-sans">{formatCurrency(data.amount)}</span>
           </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-16 mt-16">
          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 h-8"></div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Tenant Signature</p>
          </div>
          <div className="text-center">
             <div className="relative border-b border-gray-400 mb-2 h-8 flex items-end justify-center">
                {/* Simulated Signature */}
                <span className="font-serif text-2xl text-blue-900 opacity-80 italic absolute bottom-1 font-bold transform -rotate-6">{LANDLORD_INFO.name.split(' ')[0]}</span>
             </div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Landlord Signature</p>
             <p className="text-[10px] text-gray-400 mt-1">{LANDLORD_INFO.name}</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
           <p className="text-[10px] text-gray-400 uppercase tracking-widest">Thank you for your tenancy at {LANDLORD_INFO.houseName}</p>
        </div>

      </div>
    </div>
  );
};