import { NextRequest, NextResponse } from 'next/server';
import { mockReports } from '@/lib/mockData';
import { logApiRequest, logApiResponse } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  
  logApiRequest('GET', request.url, request.headers.get('user-agent') || undefined);
  
  try {
    const reportType = searchParams.get('reportType');
    const industry = searchParams.get('industry');
    const minConfidence = searchParams.get('minConfidence');
    const maxConfidence = searchParams.get('maxConfidence');
    
    let filteredReports = mockReports;
    
    if (reportType) {
      filteredReports = filteredReports.filter(report => report.reportType === reportType);
    }
    
    if (industry) {
      filteredReports = filteredReports.filter(report => report.industry === industry);
    }
    
    if (minConfidence) {
      filteredReports = filteredReports.filter(report => report.confidenceScore >= parseInt(minConfidence));
    }
    
    if (maxConfidence) {
      filteredReports = filteredReports.filter(report => report.confidenceScore <= parseInt(maxConfidence));
    }
    
    const duration = Date.now() - startTime;
    logApiResponse('GET', request.url, 200, duration);
    
    return NextResponse.json({
      reports: filteredReports,
      total: filteredReports.length,
      filters: {
        reportType,
        industry,
        minConfidence,
        maxConfidence
      }
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logApiResponse('GET', request.url, 500, duration);
    
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}