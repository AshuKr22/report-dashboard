import { NextRequest } from 'next/server';
import { mockReports } from '@/lib/mockData';
import { requestMiddleware, createApiResponse, createErrorResponse } from '@/lib/middleware';

export async function GET(request: NextRequest) {
  const { startTime, traceId } = requestMiddleware(request);
  const { searchParams } = new URL(request.url);
  
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
    
    return createApiResponse({
      reports: filteredReports,
      total: filteredReports.length,
      filters: {
        reportType,
        industry,
        minConfidence,
        maxConfidence
      },
      traceId
    }, request, startTime, traceId);
  } catch (error) {
    return createErrorResponse('Failed to fetch reports', request, startTime, traceId, 500);
  }
}