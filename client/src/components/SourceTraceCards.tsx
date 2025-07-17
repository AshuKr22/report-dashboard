'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Database, FileText, UserCheck, Shield } from 'lucide-react';
import { SourceTrace } from '@/types';
import { Badge } from '@/components/ui/badge';

interface SourceTraceCardsProps {
  sources: SourceTrace[];
}

export function SourceTraceCards({ sources }: SourceTraceCardsProps) {
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());

  const toggleSource = (sourceId: string) => {
    const newExpanded = new Set(expandedSources);
    if (newExpanded.has(sourceId)) {
      newExpanded.delete(sourceId);
    } else {
      newExpanded.add(sourceId);
    }
    setExpandedSources(newExpanded);
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'data-source': return <Database className="w-5 h-5" />;
      case 'methodology': return <FileText className="w-5 h-5" />;
      case 'expert-review': return <UserCheck className="w-5 h-5" />;
      case 'validation': return <Shield className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'data-source': return 'text-blue-600 dark:text-blue-400';
      case 'methodology': return 'text-green-600 dark:text-green-400';
      case 'expert-review': return 'text-purple-600 dark:text-purple-400';
      case 'validation': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return 'text-green-600 dark:text-green-400';
    if (reliability >= 80) return 'text-yellow-600 dark:text-yellow-400';
    if (reliability >= 70) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Source Traceability</h3>
        <p className="text-sm text-muted-foreground">
          Click on any source to see detailed information about data reliability and validation methods.
        </p>
      </div>

      {sources.map((source) => {
        const isExpanded = expandedSources.has(source.id);
        
        return (
          <div
            key={source.id}
            className="border border-border rounded-lg bg-card transition-all duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggleSource(source.id)}
              className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${getSourceColor(source.type)}`}>
                    {getSourceIcon(source.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{source.title}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {source.type.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getReliabilityColor(source.reliability)}`}>
                      {source.reliability}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      reliability
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4 space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Description</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {source.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-1">Last Updated</h5>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(source.lastUpdated)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {source.type.replace('-', ' ')}
                      </Badge>
                      <div className={`text-xs px-2 py-1 rounded-full bg-muted ${getReliabilityColor(source.reliability)}`}>
                        {source.reliability}% reliable
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-md p-3">
                    <h5 className="text-sm font-medium text-foreground mb-2">Validation Notes</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Cross-referenced with multiple independent sources</li>
                      <li>• Data integrity verified through automated checks</li>
                      <li>• Subject matter expert review completed</li>
                      {source.reliability >= 90 && (
                        <li>• Meets highest confidence standards</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}