/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  bgClass: string;
  textClass: string;
  role: string;
  darkContrast: boolean;
}

export interface FontToken {
  name: string;
  size: string;
  weight: string;
  usage: string;
  preview: string;
}

export type MicState = 'idle' | 'requesting' | 'listening' | 'processing' | 'speaking' | 'muted' | 'error';

export interface ScoreCategory {
  label: string;
  score: number;
  color: string;
  comment: string;
}

export interface FeedbackData {
  textSpoken: string;
  phonetics: string;
  overallScore: number;
  accuracy: number;
  fluency: number;
  pronunciation: number;
  grammarCorrections?: {
    original: string;
    corrected: string;
    explanation: string;
  };
  wordGraph: {
    word: string;
    score: 'perfect' | 'good' | 'needs-improvement';
    ipa: string;
  }[];
}

export interface PracticePrompt {
  id: string;
  topic: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  promptText: string;
  exemplar: string;
}
