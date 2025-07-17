import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function requestMiddleware(req: NextRequest) {
  const startTime = Date.now();
  const traceId = uuidv4();
  
  // Log the incoming request with trace ID
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  console.log(`\x1b[36m[${timestamp}]\x1b[0m \x1b[44m[TRACE: ${traceId}]\x1b[0m \x1b[33m${method}\x1b[0m ${url.replace('http://localhost:3000', '')} - \x1b[32m${userAgent.split(' ')[0]}\x1b[0m`);
  
  return { startTime, traceId };
}

export function responseMiddleware(req: NextRequest, startTime: number, traceId: string, statusCode: number) {
  const endTime = Date.now();
  const latency = endTime - startTime;
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const statusColor = statusCode >= 400 ? '\x1b[31m' : statusCode >= 300 ? '\x1b[33m' : '\x1b[32m';
  
  console.log(`\x1b[36m[${timestamp}]\x1b[0m \x1b[44m[TRACE: ${traceId}]\x1b[0m \x1b[35m${method}\x1b[0m ${url.replace('http://localhost:3000', '')} - ${statusColor}${statusCode}\x1b[0m \x1b[90m(${latency}ms)\x1b[0m`);
}

export function createApiResponse<T>(data: T, req: NextRequest, startTime: number, traceId: string, status: number = 200) {
  responseMiddleware(req, startTime, traceId, status);
  
  const response = NextResponse.json(data, { status });
  response.headers.set('X-Trace-ID', traceId);
  response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
  
  return response;
}

export function createErrorResponse(message: string, req: NextRequest, startTime: number, traceId: string, status: number = 500) {
  responseMiddleware(req, startTime, traceId, status);
  
  const response = NextResponse.json({ error: message }, { status });
  response.headers.set('X-Trace-ID', traceId);
  response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
  
  return response;
}