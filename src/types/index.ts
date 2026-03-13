// MBTI Types
export type MBTIType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  content: string;
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
  direction: 'positive' | 'reverse';
}

export interface Answer {
  questionId: number;
  value: number; // 1-5
}

export interface TestSession {
  id: string;
  userId?: string;
  version: 'quick' | 'standard' | 'professional';
  status: 'in_progress' | 'completed' | 'abandoned';
  currentQuestion: number;
  answers: Answer[];
  startedAt: string;
  finishedAt?: string;
  createdAt: string;
}

export interface DimensionScore {
  dimension: 'E_I' | 'S_N' | 'T_F' | 'J_P';
  leftScore: number; // E, S, T, J
  rightScore: number; // I, N, F, P
  result: Dimension;
  percentage: number; // 0-100
}

export interface MBTIResult {
  type: MBTIType;
  dimensions: DimensionScore[];
  nickname: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string[];
  growth: string[];
}

export interface PersonalityType {
  code: MBTIType;
  name: string;
  nickname: string;
  description: string;
  image: string;
  color: string;
  functions: string[];
  famous: string[];
}

export interface Report {
  id: string;
  sessionId: string;
  userId?: string;
  type: 'free' | 'premium';
  result: MBTIResult;
  isPaid: boolean;
  paidAt?: string;
  createdAt: string;
}

export interface User {
  id: string;
  nickname?: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestVersion {
  id: 'quick' | 'standard' | 'professional';
  name: string;
  questionCount: number;
  duration: string;
  price: number;
  features: string[];
  recommended: boolean;
}
