import pino from 'pino';

export const logger = pino({
  level: 'info',
  // Use basic formatting for Next.js environment
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  } : undefined
});

export function logApiRequest(method: string, url: string, userAgent?: string) {
  logger.info({
    method,
    url,
    userAgent: userAgent || 'unknown'
  }, 'API Request');
}

export function logApiResponse(method: string, url: string, status: number, duration?: number) {
  logger.info({
    method,
    url,
    status,
    duration: duration ? `${duration}ms` : undefined
  }, 'API Response');
}
