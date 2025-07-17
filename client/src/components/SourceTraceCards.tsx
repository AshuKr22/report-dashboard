"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  FileText,
  GraduationCap,
  Share2,
  Building,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { SourceTrace } from "@/types";
import { Badge } from "@/components/ui/badge";

interface SourceTraceCardsProps {
  sources: SourceTrace[];
}

export function SourceTraceCards({ sources }: SourceTraceCardsProps) {
  const [expandedSources, setExpandedSources] = useState<Set<string>>(
    new Set()
  );

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
      case "website":
        return <Globe className="w-5 h-5" />;
      case "news":
        return <FileText className="w-5 h-5" />;
      case "scholar":
        return <GraduationCap className="w-5 h-5" />;
      case "social-media":
        return <Share2 className="w-5 h-5" />;
      case "industry-report":
        return <BarChart3 className="w-5 h-5" />;
      case "government-data":
        return <Building className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case "website":
        return "text-blue-600 dark:text-blue-400";
      case "news":
        return "text-green-600 dark:text-green-400";
      case "scholar":
        return "text-purple-600 dark:text-purple-400";
      case "social-media":
        return "text-pink-600 dark:text-pink-400";
      case "industry-report":
        return "text-orange-600 dark:text-orange-400";
      case "government-data":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 90) return "text-green-600 dark:text-green-400";
    if (reliability >= 80) return "text-yellow-600 dark:text-yellow-400";
    if (reliability >= 70) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Data Sources
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize sections to suit your needs. Click on any source to view
          detailed information and citations.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="text-xs">
          Website
        </Badge>
        <Badge variant="outline" className="text-xs">
          News
        </Badge>
        <Badge variant="outline" className="text-xs">
          Scholar
        </Badge>
        <Badge variant="outline" className="text-xs">
          Social Media
        </Badge>
      </div>

      {sources.map((source) => {
        const isExpanded = expandedSources.has(source.id);

        return (
          <div
            key={source.id}
            className="border border-border rounded-lg bg-card transition-all duration-200 hover:shadow-md"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`mt-1 ${getSourceColor(source.type)}`}>
                    {getSourceIcon(source.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground text-sm">
                        {source.title}
                      </h4>
                      <button
                        onClick={() => window.open(source.url, "_blank")}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 break-all">
                      {getDisplayUrl(source.url)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {source.publisher} • {formatDate(source.publishedDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center ml-4">
                  <button
                    onClick={() => toggleSource(source.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {!isExpanded && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {source.description}
                </p>
              )}
            </div>

            {isExpanded && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4 space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">
                      Description
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {source.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-1">
                        Publisher
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {source.publisher}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-1">
                        Published
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(source.publishedDate)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-1">
                      Source URL
                    </h5>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {source.url}
                    </a>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {source.type.replace("-", " ")}
                      </Badge>
                      <div
                        className={`text-xs px-2 py-1 rounded-full bg-muted font-medium ${getReliabilityColor(
                          source.reliability
                        )}`}
                      >
                        {source.reliability}% reliable
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Accessed: {formatDate(source.accessDate)}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-md p-3">
                    <h5 className="text-sm font-medium text-foreground mb-2">
                      Citation
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                      {source.citation}
                    </p>
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
