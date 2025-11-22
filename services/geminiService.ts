import { GoogleGenAI } from "@google/genai";
import { ReceiptData } from '../types';
import { LANDLORD_INFO } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWhatsAppMessage = async (data: ReceiptData): Promise<string> => {
  try {
    const prompt = `
      Write a polite, professional, and friendly WhatsApp message from the landlord (${LANDLORD_INFO.name}) to the tenant (${data.tenantName}).
      
      Context:
      - The tenant has successfully paid rent of ₦${data.amount.toLocaleString()} for ${data.roomNumber} at ${LANDLORD_INFO.houseName}.
      - Period covered: ${data.periodStart} to ${data.periodEnd}.
      - Payment Date: ${data.paymentDate}.
      
      The message should thank them for the payment, confirm receipt, and wish them a pleasant stay. 
      Keep it concise (under 100 words) and suitable for WhatsApp.
      Do not include placeholders.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate message.";
  } catch (error) {
    console.error("Error generating message:", error);
    return "Thank you for your payment. This message confirms your rent has been received.";
  }
};