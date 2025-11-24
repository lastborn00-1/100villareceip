export interface ReceiptData {
  receiptNumber: string;
  tenantName: string;
  amount: number;
  paymentDate: string;
  periodStart: string;
  periodEnd: string;
  roomNumber: string;
  paymentMethod: PaymentMethod;
  notes: string;
}

export enum PaymentMethod {
  CASH = 'Cash',
  TRANSFER = 'Bank Transfer',
  POS = 'POS',
  CHEQUE = 'Cheque'
}

export interface LandlordDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  houseName: string;
  houseDescription: string;
}