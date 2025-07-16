export interface Report {
  id: string;
  title: string;
  summary: string;
  reportType: 'market-analysis' | 'financial-audit' | 'risk-assessment' | 'compliance';
  confidenceScore: number;
  industry: 'technology' | 'healthcare' | 'finance' | 'retail' | 'manufacturing';
  createdAt: string;
  author: string;
  sources: SourceTrace[];
  details: string;
}

export interface SourceTrace {
  id: string;
  type: 'data-source' | 'methodology' | 'expert-review' | 'validation';
  title: string;
  description: string;
  reliability: number;
  lastUpdated: string;
}

export interface FeedbackRequest {
  reportId: string;
  userComment: string;
  flaggedSection?: string;
  rating?: number;
}

export interface User {
  id: string;
  role: 'viewer' | 'reviewer';
  name: string;
}