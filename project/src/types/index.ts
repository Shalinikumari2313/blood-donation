export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'donor' | 'recipient' | 'bloodbank';
  bloodType?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  lastDonation?: Date;
  medicalHistory?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
  };
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  location: {
    lat: number;
    lng: number;
  };
  operatingHours: {
    open: string;
    close: string;
  };
  inventory: BloodInventory[];
  distance?: number;
}

export interface BloodInventory {
  bloodType: string;
  units: number;
  expiryDate: Date;
  lastUpdated: Date;
}

export interface DonationRequest {
  id: string;
  donorId: string;
  bloodBankId: string;
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bloodType: string;
  notes?: string;
}

export interface BloodRequest {
  id: string;
  recipientId: string;
  bloodType: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  unitsNeeded: number;
  hospitalName: string;
  doctorName: string;
  patientName: string;
  contactNumber: string;
  medicalReason: string;
  status: 'active' | 'fulfilled' | 'expired';
  dateRequested: Date;
  requiredBy: Date;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];