'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface FilterState {
  reportType: string;
  industry: string;
  minConfidence: number;
  maxConfidence: number;
}

export function FilterPanel({ onFilterChange, isOpen, onToggle }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    reportType: 'all',
    industry: 'all',
    minConfidence: 0,
    maxConfidence: 100
  });

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      reportType: 'all',
      industry: 'all',
      minConfidence: 0,
      maxConfidence: 100
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const reportTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'market-analysis', label: 'Market Analysis' },
    { value: 'financial-audit', label: 'Financial Audit' },
    { value: 'risk-assessment', label: 'Risk Assessment' },
    { value: 'compliance', label: 'Compliance' }
  ];

  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' }
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <Button
        onClick={onToggle}
        size="icon"
        className="md:hidden fixed top-4 right-4 z-50 bg-purple-600 text-white rounded-full shadow-lg"
      >
        <Filter className="w-5 h-5" />
      </Button>

      {/* Filter Panel */}
      <div className={`
        fixed md:relative top-0 right-0 h-full w-80 bg-background shadow-lg z-40 transform transition-transform
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        md:w-64 md:shadow-none md:border-l border-border
      `}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Report Type Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Report Type
              </label>
              <Select value={filters.reportType} onValueChange={(value) => handleFilterChange('reportType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Industry
              </label>
              <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Confidence Score Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confidence Score Range
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    Minimum: {filters.minConfidence}%
                  </label>
                  <Slider
                    value={[filters.minConfidence]}
                    onValueChange={(value) => handleFilterChange('minConfidence', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    Maximum: {filters.maxConfidence}%
                  </label>
                  <Slider
                    value={[filters.maxConfidence]}
                    onValueChange={(value) => handleFilterChange('maxConfidence', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            <Button
              onClick={clearFilters}
              variant="outline"
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}