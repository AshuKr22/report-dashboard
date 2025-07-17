'use client';

import { useState, useEffect } from 'react';
import { Report, User } from '@/types';
import { ReportDashboard } from '@/components/ReportDashboard';
import { ReportDetailPanel } from '@/components/ReportDetailPanel';
import { LoginForm } from '@/components/LoginForm';
import { getCurrentUser, logout } from '@/lib/auth';

export default function Home() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setSelectedReport(null);
  };

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen">
      <ReportDashboard 
        onReportSelect={handleReportSelect} 
        user={user}
        onLogout={handleLogout}
      />
      <ReportDetailPanel
        report={selectedReport}
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
}
