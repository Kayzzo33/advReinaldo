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

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isError?: boolean;
}

// Estrutura de dados retornada pela IA
export interface LeadAnalysis {
  name: string;
  summary: string; // Resumo do caso para o Dr. Reinaldo
  urgency: 'Alta' | 'Média' | 'Baixa';
  qualified: boolean; // True = Trabalhista/Previdenciário | False = Outras áreas/Curioso
  reason: string; // Por que qualificou ou desqualificou
}

export interface GeminiResponse {
  text: string;
  analysis?: LeadAnalysis;
}
