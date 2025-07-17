'use client';

import { Report } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ConfidenceMeter } from './ConfidenceMeter';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
}

export function ReportCard({ report, onClick }: ReportCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'market-analysis': return 'bg-blue-100 text-blue-800';
      case 'financial-audit': return 'bg-green-100 text-green-800';
      case 'risk-assessment': return 'bg-red-100 text-red-800';
      case 'compliance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'technology': return 'bg-indigo-100 text-indigo-800';
      case 'healthcare': return 'bg-emerald-100 text-emerald-800';
      case 'finance': return 'bg-yellow-100 text-yellow-800';
      case 'retail': return 'bg-pink-100 text-pink-800';
      case 'manufacturing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-border"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-card-foreground line-clamp-2">
          {report.title}
        </h3>
        <div className="flex items-center space-x-2 ml-4">
          <ConfidenceMeter score={report.confidenceScore} size="sm" />
          <span className="text-sm font-medium text-muted-foreground">
            {report.confidenceScore}%
          </span>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {report.summary}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className={getReportTypeColor(report.reportType)}>
          {report.reportType.replace('-', ' ')}
        </Badge>
        <Badge variant="outline" className={getIndustryColor(report.industry)}>
          {report.industry}
        </Badge>
      </div>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>By {report.author}</span>
        <span>{formatDate(report.createdAt)}</span>
      </div>
    </div>
  );
}