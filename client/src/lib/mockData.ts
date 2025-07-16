import { Report, SourceTrace } from '@/types';

const sourcesData = [
  {
    id: '1',
    type: 'data-source',
    title: 'Market Research Database',
    description: 'Comprehensive industry data from primary sources',
    reliability: 92,
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    type: 'methodology',
    title: 'Statistical Analysis Framework',
    description: 'Peer-reviewed methodology for data correlation',
    reliability: 88,
    lastUpdated: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    type: 'expert-review',
    title: 'Industry Expert Validation',
    description: 'Review by certified industry professionals',
    reliability: 95,
    lastUpdated: '2024-01-16T09:15:00Z'
  },
  {
    id: '4',
    type: 'validation',
    title: 'Cross-Reference Verification',
    description: 'Multi-source validation and fact-checking',
    reliability: 90,
    lastUpdated: '2024-01-16T11:45:00Z'
  }
] satisfies SourceTrace[];

export const mockReports = [
  {
    id: '1',
    title: 'Q4 2023 Technology Sector Analysis',
    summary: 'Comprehensive analysis of technology sector performance with focus on AI and cloud computing growth trends.',
    reportType: 'market-analysis',
    confidenceScore: 89,
    industry: 'technology',
    createdAt: '2024-01-15T12:00:00Z',
    author: 'Dr. Sarah Chen',
    sources: sourcesData.slice(0, 3),
    details: 'This report analyzes the technology sector performance in Q4 2023, highlighting significant growth in AI and cloud computing sectors. Key findings include a 34% increase in AI investments and 28% growth in cloud infrastructure spending.'
  },
  {
    id: '2',
    title: 'Healthcare Compliance Audit 2024',
    summary: 'Annual compliance audit focusing on HIPAA regulations and data security measures across healthcare institutions.',
    reportType: 'compliance',
    confidenceScore: 95,
    industry: 'healthcare',
    createdAt: '2024-01-14T09:30:00Z',
    author: 'Michael Rodriguez',
    sources: sourcesData.slice(1, 4),
    details: 'Comprehensive compliance audit revealing 98% adherence to HIPAA regulations with recommendations for improved data encryption and access controls.'
  },
  {
    id: '3',
    title: 'Financial Risk Assessment - Banking Sector',
    summary: 'Risk analysis of major banking institutions with focus on credit risk and market volatility exposure.',
    reportType: 'risk-assessment',
    confidenceScore: 78,
    industry: 'finance',
    createdAt: '2024-01-13T16:45:00Z',
    author: 'Jennifer Liu',
    sources: sourcesData.slice(0, 2),
    details: 'Analysis of systemic risks in the banking sector, identifying potential vulnerabilities in credit portfolios and exposure to market volatility.'
  },
  {
    id: '4',
    title: 'Retail Market Trends Analysis',
    summary: 'Consumer behavior analysis and market trends in retail sector with emphasis on e-commerce growth.',
    reportType: 'market-analysis',
    confidenceScore: 82,
    industry: 'retail',
    createdAt: '2024-01-12T11:20:00Z',
    author: 'David Park',
    sources: sourcesData.slice(2, 4),
    details: 'Detailed analysis of retail market trends showing 45% growth in e-commerce sales and shifting consumer preferences toward sustainable products.'
  },
  {
    id: '5',
    title: 'Manufacturing Financial Audit',
    summary: 'Financial performance audit of manufacturing companies with focus on supply chain costs and efficiency.',
    reportType: 'financial-audit',
    confidenceScore: 91,
    industry: 'manufacturing',
    createdAt: '2024-01-11T14:10:00Z',
    author: 'Elena Kowalski',
    sources: sourcesData,
    details: 'Financial audit revealing opportunities for cost optimization in supply chain management and improved operational efficiency measures.'
  },
  {
    id: '6',
    title: 'Technology Risk Assessment Q1 2024',
    summary: 'Cybersecurity risk assessment for technology companies with focus on data breaches and system vulnerabilities.',
    reportType: 'risk-assessment',
    confidenceScore: 73,
    industry: 'technology',
    createdAt: '2024-01-10T08:00:00Z',
    author: 'Robert Kim',
    sources: sourcesData.slice(0, 3),
    details: 'Risk assessment identifying critical vulnerabilities in cloud infrastructure and recommendations for enhanced security protocols.'
  }
] satisfies Report[];