import React from 'react';
import { ReceiptData, PaymentMethod } from '../types';
import { ROOM_OPTIONS } from '../constants';
import { Calendar, User, CreditCard, Hash, Clock, FileText, Image as ImageIcon } from 'lucide-react';

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (data: ReceiptData) => void;
  onPrint: () => void;
  onGenerateMessage: () => void;
  onDownloadPDF: () => void;
  onDownloadImage: () => void;
  isGeneratingMessage: boolean;
  isDownloading: boolean;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ 
  data, 
  onChange, 
  onPrint, 
  onGenerateMessage,
  onDownloadPDF,
  onDownloadImage,
  isGeneratingMessage,
  isDownloading
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === 'amount' ? Number(value) : value,
    });
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-green-600 w-2 h-8 rounded-full block"></span>
        Receipt Details
      </h2>

      <div className="space-y-6">
        {/* Tenant Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="tenantName"
              value={data.tenantName}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="e.g. John Doe"
            />
          </div>
        </div>

        {/* Room & Amount Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
            <select
              name="roomNumber"
              value={data.roomNumber}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="">Select Room</option>
              {ROOM_OPTIONS.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-bold">₦</span>
              </div>
              <input
                type="number"
                name="amount"
                value={data.amount || ''}
                onChange={handleChange}
                className="pl-8 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Dates Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Calendar className="h-4 w-4 text-gray-400" />
               </div>
               <input
                type="date"
                name="paymentDate"
                value={data.paymentDate}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
             </div>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  name="paymentMethod"
                  value={data.paymentMethod}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  {Object.values(PaymentMethod).map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
             </div>
          </div>
        </div>

        {/* Period Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rent Period</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Clock className="h-4 w-4 text-gray-400" />
               </div>
              <input
                type="date"
                name="periodStart"
                value={data.periodStart}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-green-500"
                aria-label="Start Date"
              />
            </div>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Clock className="h-4 w-4 text-gray-400" />
               </div>
              <input
                type="date"
                name="periodEnd"
                value={data.periodEnd}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-green-500"
                aria-label="End Date"
              />
            </div>
          </div>
        </div>
        
        {/* Receipt No */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
           <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Hash className="h-4 w-4 text-gray-400" />
               </div>
              <input
                type="text"
                name="receiptNumber"
                value={data.receiptNumber}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 bg-gray-50 text-gray-500 cursor-not-allowed"
                readOnly
              />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onPrint}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            
            <button
              onClick={onGenerateMessage}
              disabled={isGeneratingMessage || !data.tenantName || !data.amount}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2 ${
                isGeneratingMessage || !data.tenantName || !data.amount
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
               {isGeneratingMessage ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
               ) : (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                 </svg>
               )}
              AI Message
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onDownloadPDF}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4" />
              {isDownloading ? 'Saving...' : 'Save PDF'}
            </button>
            <button
              onClick={onDownloadImage}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ImageIcon className="w-4 h-4" />
              {isDownloading ? 'Saving...' : 'Save Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};