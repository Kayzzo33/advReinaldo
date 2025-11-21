import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarInitial: string;
}

export interface ServiceItem {
  icon: ReactNode;
  title: string;
  description: string;
  details: string[];
  gradient: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: ReactNode;
}

export interface LeadAnalysis {
  name: string;
  summary: string;
  urgency: string;
  qualified: boolean;
  reason?: string;
}

export interface GeminiResponse {
  text: string;
  analysis?: LeadAnalysis;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isError?: boolean;
}