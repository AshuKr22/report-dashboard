'use client';

import { useState, useEffect } from 'react';
import { Report } from '@/types';
import { ReportCard } from './ReportCard';
import { FilterPanel, FilterState } from './FilterPanel';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { User } from '@/types';

interface ReportDashboardProps {
  onReportSelect: (report: Report) => void;
  user: User;
  onLogout: () => void;
}

export function ReportDashboard({ onReportSelect, user, onLogout }: ReportDashboardProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    reportType: 'all',
    industry: 'all',
    minConfidence: 0,
    maxConfidence: 100
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (filters.reportType && filters.reportType !== 'all') params.append('reportType', filters.reportType);
      if (filters.industry && filters.industry !== 'all') params.append('industry', filters.industry);
      if (filters.minConfidence > 0) params.append('minConfidence', filters.minConfidence.toString());
      if (filters.maxConfidence < 100) params.append('maxConfidence', filters.maxConfidence.toString());

      const response = await fetch(`/api/reports?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const data = await response.json();
      setReports(data.reports);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-background border-b border-border px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">
              Report Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {filteredReports.length} reports
              </span>
              <ThemeToggle />
              <UserMenu user={user} onLogout={onLogout} />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">{error}</p>
              <Button
                onClick={fetchReports}
                variant="destructive"
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No reports match your search.' : 'No reports found with current filters.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onClick={() => onReportSelect(report)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        onFilterChange={handleFilterChange}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />
    </div>
  );
}