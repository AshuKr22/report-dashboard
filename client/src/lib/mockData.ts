import { Report, SourceTrace } from "@/types";

const sourcesData = [
  {
    id: "1",
    type: "industry-report",
    title: "Industry Reports/healthcare-asset-management-market",
    url: "https://www.mordorintelligence.com/industry-reports/healthcare-asset-management-market",
    description:
      "Healthcare Asset Management Market Analysis - Growth, Trends, COVID-19 Impact, and Forecasts",
    publisher: "Mordor Intelligence",
    publishedDate: "2023-12-15",
    reliability: 92,
    accessDate: "2024-01-15T10:30:00Z",
    citation:
      "Mordor Intelligence. (2023). Healthcare Asset Management Market - Growth, Trends, COVID-19 Impact, and Forecasts. Retrieved January 15, 2024.",
  },
  {
    id: "2",
    type: "industry-report",
    title: "Healthcare Asset Management Market Report",
    url: "https://medtechinsights.com/healthcare-asset-management-market/",
    description:
      "Comprehensive analysis of healthcare asset management systems and market dynamics",
    publisher: "MedTech Insights",
    publishedDate: "2024-01-10",
    reliability: 88,
    accessDate: "2024-01-14T14:20:00Z",
    citation:
      "MedTech Insights. (2024). Healthcare Asset Management Market Report. Retrieved January 14, 2024.",
  },
  {
    id: "3",
    type: "industry-report",
    title: "Asset Tracking Inventory Management Systems Market",
    url: "https://www.grandviewresearch.com/industry-analysis/hospital-asset-tracking-inventory-management-systems-market",
    description:
      "Hospital Asset Tracking & Inventory Management Systems Market Size, Share & Trends Analysis",
    publisher: "Grand View Research",
    publishedDate: "2023-11-20",
    reliability: 95,
    accessDate: "2024-01-16T09:15:00Z",
    citation:
      "Grand View Research. (2023). Hospital Asset Tracking & Inventory Management Systems Market. Retrieved January 16, 2024.",
  },
  {
    id: "4",
    type: "industry-report",
    title: "Fortune Business Insights - Hospital Asset Management",
    url: "https://www.fortunebusinessinsights.com/industry-reports/hospital-asset-management-systems-market-100825",
    description:
      "Hospital Asset Management Systems Market research with detailed analysis and forecasts",
    publisher: "Fortune Business Insights",
    publishedDate: "2024-01-05",
    reliability: 90,
    accessDate: "2024-01-16T11:45:00Z",
    citation:
      "Fortune Business Insights. (2024). Hospital Asset Management Systems Market. Retrieved January 16, 2024.",
  },
  {
    id: "5",
    type: "industry-report",
    title: "Market Reports - Healthcare Asset Management",
    url: "https://www.marketsandmarkets.com/Market-Reports/healthcare-and-pharmaceuticals-asset-management-market-1195.html",
    description:
      "Healthcare and Pharmaceuticals Asset Management Market by Component, Application, and Geography",
    publisher: "MarketsandMarkets",
    publishedDate: "2023-12-08",
    reliability: 93,
    accessDate: "2024-01-12T08:30:00Z",
    citation:
      "MarketsandMarkets. (2023). Healthcare and Pharmaceuticals Asset Management Market. Retrieved January 12, 2024.",
  },
  {
    id: "6",
    type: "industry-report",
    title: "Healthcare Asset Analysis Report",
    url: "https://www.grandviewresearch.com/industry-analysis/healthcare-asset-management-market-report",
    description:
      "Detailed analysis of current market conditions, key players, and growth projections in healthcare asset management",
    publisher: "Grand View Research",
    publishedDate: "2023-10-15",
    reliability: 89,
    accessDate: "2024-01-10T15:20:00Z",
    citation:
      "Grand View Research. (2023). Healthcare Asset Analysis Report. Retrieved January 10, 2024.",
  },
] satisfies SourceTrace[];

export const mockReports = [
  {
    id: "1",
    title: "Q4 2023 Technology Sector Analysis",
    summary:
      "Comprehensive analysis of technology sector performance with focus on AI and cloud computing growth trends.",
    reportType: "market-analysis",
    confidenceScore: 89,
    industry: "technology",
    createdAt: "2024-01-15T12:00:00Z",
    author: "Dr. Sarah Chen",
    sources: sourcesData.slice(0, 3),
    details:
      "This report analyzes the technology sector performance in Q4 2023, highlighting significant growth in AI and cloud computing sectors. Key findings include a 34% increase in AI investments and 28% growth in cloud infrastructure spending.",
  },
  {
    id: "2",
    title: "Healthcare Compliance Audit 2024",
    summary:
      "Annual compliance audit focusing on HIPAA regulations and data security measures across healthcare institutions.",
    reportType: "compliance",
    confidenceScore: 95,
    industry: "healthcare",
    createdAt: "2024-01-14T09:30:00Z",
    author: "Michael Rodriguez",
    sources: sourcesData.slice(1, 4),
    details:
      "Comprehensive compliance audit revealing 98% adherence to HIPAA regulations with recommendations for improved data encryption and access controls.",
  },
  {
    id: "3",
    title: "Financial Risk Assessment - Banking Sector",
    summary:
      "Risk analysis of major banking institutions with focus on credit risk and market volatility exposure.",
    reportType: "risk-assessment",
    confidenceScore: 78,
    industry: "finance",
    createdAt: "2024-01-13T16:45:00Z",
    author: "Jennifer Liu",
    sources: sourcesData.slice(0, 2),
    details:
      "Analysis of systemic risks in the banking sector, identifying potential vulnerabilities in credit portfolios and exposure to market volatility.",
  },
  {
    id: "4",
    title: "Retail Market Trends Analysis",
    summary:
      "Consumer behavior analysis and market trends in retail sector with emphasis on e-commerce growth.",
    reportType: "market-analysis",
    confidenceScore: 82,
    industry: "retail",
    createdAt: "2024-01-12T11:20:00Z",
    author: "David Park",
    sources: sourcesData.slice(2, 4),
    details:
      "Detailed analysis of retail market trends showing 45% growth in e-commerce sales and shifting consumer preferences toward sustainable products.",
  },
  {
    id: "5",
    title: "Manufacturing Financial Audit",
    summary:
      "Financial performance audit of manufacturing companies with focus on supply chain costs and efficiency.",
    reportType: "financial-audit",
    confidenceScore: 91,
    industry: "manufacturing",
    createdAt: "2024-01-11T14:10:00Z",
    author: "Elena Kowalski",
    sources: sourcesData,
    details:
      "Financial audit revealing opportunities for cost optimization in supply chain management and improved operational efficiency measures.",
  },
  {
    id: "6",
    title: "Technology Risk Assessment Q1 2024",
    summary:
      "Cybersecurity risk assessment for technology companies with focus on data breaches and system vulnerabilities.",
    reportType: "risk-assessment",
    confidenceScore: 73,
    industry: "technology",
    createdAt: "2024-01-10T08:00:00Z",
    author: "Robert Kim",
    sources: sourcesData.slice(0, 3),
    details:
      "Risk assessment identifying critical vulnerabilities in cloud infrastructure and recommendations for enhanced security protocols.",
  },
] satisfies Report[];
