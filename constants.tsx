
import React from 'react';
import { 
  LayoutGrid, 
  PhoneCall, 
  Users, 
  Wrench, 
  Calendar, 
  Settings, 
  Zap, 
  Inbox, 
  Building2,
  History,
  PhoneIncoming,
  MessageSquare,
  ReceiptText,
  Truck,
  Search,
  Activity
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'search', label: 'Search', icon: <Search size={18} /> },
  { id: 'insights', label: 'Insights', icon: <LayoutGrid size={18} /> },
  { id: 'calls', label: 'Inbox', icon: <Inbox size={18} />, badge: 12 },
  { id: 'leads', label: 'Leads', icon: <Users size={18} /> },
  { id: 'maintenance', label: 'Maintenance', icon: <Wrench size={18} /> },
  { id: 'scheduling', label: 'Scheduling', icon: <Calendar size={18} /> },
  { id: 'properties', label: 'Properties', icon: <Building2 size={18} /> },
  { id: 'vendors', label: 'Vendors', icon: <Truck size={18} /> },
];

export const SETTINGS_ITEMS = [
  { id: 'settings', label: 'Settings', icon: <Settings size={18} />, shortcut: '⌘,' },
  { id: 'upgrade', label: 'Upgrade Now', icon: <Zap size={18} />, isPremium: true },
];

export const BRAND_ACCENT = 'bg-[#abc2fe]'; // Updated to light blue
export const BRAND_TEXT_ACCENT = 'text-[#7a9dfc]'; // Complementary darker blue
