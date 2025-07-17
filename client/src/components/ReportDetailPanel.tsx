'use client';

import { useState } from 'react';
import { X, ExternalLink, User, Calendar, Tag, TrendingUp } from 'lucide-react';
import { Report } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConfidenceMeter } from './ConfidenceMeter';
import { SourceTraceCards } from './SourceTraceCards';
import { FeedbackForm } from './FeedbackForm';

interface ReportDetailPanelProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportDetailPanel({ report, isOpen, onClose }: ReportDetailPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!report) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'market-analysis': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'financial-audit': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'risk-assessment': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'compliance': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'technology': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'healthcare': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'finance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'retail': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'manufacturing': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Slide-out Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-2xl bg-background border-l border-border shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Report Details</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Report Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-3">
                  {report.title}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className={getReportTypeColor(report.reportType)}>
                    {report.reportType.replace('-', ' ')}
                  </Badge>
                  <Badge variant="outline" className={getIndustryColor(report.industry)}>
                    {report.industry}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {report.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(report.createdAt)}</span>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Confidence Score</span>
                    <span className="text-lg font-bold text-foreground">{report.confidenceScore}%</span>
                  </div>
                  <ConfidenceMeter score={report.confidenceScore} size="lg" />
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="trust">Why We Trust This</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Summary</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {report.summary}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Details</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {report.details}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Key Insights</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>High confidence rating indicates strong data backing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>Multiple validation sources confirm findings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>Industry expert review completed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trust" className="mt-6">
                  <SourceTraceCards sources={report.sources} />
                </TabsContent>

                <TabsContent value="feedback" className="mt-6">
                  <FeedbackForm reportId={report.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}