import React from 'react';

export type LeadStatus = 'New' | 'In Progress' | 'Follow Up' | 'Closed' | 'Lost';

export interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  status: LeadStatus;
  notes: string;
  lastContact: string | null;
  timezone: string;
  officeHours: string;
  assignedAgent?: string;
}

export type ViewState = 'dashboard' | 'leads' | 'call';

export interface Stats {
  total: number;
  calledToday: number;
  new: number;
  closed: number;
  followUp: number;
}

export interface ScriptSection {
  id: string;
  title: string;
  content: React.ReactNode;
}