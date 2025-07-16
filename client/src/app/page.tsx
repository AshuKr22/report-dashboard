'use client';

import { useState } from 'react';
import { Report } from '@/types';
import { ReportDashboard } from '@/components/ReportDashboard';

export default function Home() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
  };

  return (
    <div className="h-screen">
      <ReportDashboard onReportSelect={handleReportSelect} />
    </div>
  );
}
