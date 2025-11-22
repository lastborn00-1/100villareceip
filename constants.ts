import { LandlordDetails } from './types';

export const LANDLORD_INFO: LandlordDetails = {
  name: "Abdulrasheed Yahaya",
  phone: "09052249906",
  email: "codecraft060@gmail.com",
  houseName: "100Villa",
  houseDescription: "11-Room Self-Contain Apartment Complex",
  address: "Ojoku Road, Opposite Kwara State College of Health Technology, Offa, Kwara State, Nigeria"
};

export const ROOM_OPTIONS = Array.from({ length: 11 }, (_, i) => `Room ${i + 1}`);

export const GENERATE_RECEIPT_NUMBER = () => {
  const date = new Date();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `RCP-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}-${random}`;
};