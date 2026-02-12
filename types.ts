
export enum CallCategory {
  LEASING = 'Leasing inquiry',
  RESIDENT = 'Existing resident issue',
  EMERGENCY = 'Emergency',
  VENDOR = 'Vendor',
  HOA = 'HOA/bylaws question',
  GENERAL = 'General information'
}

export enum LeadScore {
  HOT = 'Hot',
  MEDIUM = 'Medium',
  LOW = 'Low',
  NOT_A_FIT = 'Not a fit'
}

export enum EmergencyLevel {
  EMERGENCY = 'Emergency',
  URGENT = 'Urgent',
  NON_URGENT = 'Non-urgent'
}

export type InteractionType = 'call' | 'sms';

export interface CallRecord {
  id: string;
  callerName: string;
  phoneNumber: string;
  timestamp: string;
  category: CallCategory;
  summary: string;
  duration: string;
  status: 'completed' | 'live' | 'missed';
  interactionType?: InteractionType;
}

export interface LeasingLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  moveInDate: string;
  budget: string;
  unitType: string;
  pets: boolean;
  score: LeadScore;
  lastContacted: string;
}

export interface MaintenanceTicket {
  id: string;
  tenantName: string;
  unit: string;
  issue: string;
  severity: EmergencyLevel;
  status: 'Open' | 'Dispatched' | 'Resolved';
  timestamp: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  contactPerson: string;
  activeJobs: number;
}

export interface VendorTransaction {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  property: string;
  amount: number;
  status: 'paid' | 'processing' | 'pending' | 'overdue';
  date: string;
}
