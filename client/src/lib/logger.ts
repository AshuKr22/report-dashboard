// Simple, clean logging for development
export function logApiRequest(method: string, url: string, userAgent?: string) {
  if (process.env.NODE_ENV === "development") {
    const timestamp = new Date().toISOString();
    const cleanUrl = url.replace("http://localhost:3000", "");
    console.log(
      `\x1b[36m[${timestamp}]\x1b[0m \x1b[33m${method}\x1b[0m ${cleanUrl} - \x1b[32m${
        userAgent?.split(" ")[0] || "unknown"
      }\x1b[0m`
    );
  }
}

export function logApiResponse(
  method: string,
  url: string,
  status: number,
  duration?: number
) {
  if (process.env.NODE_ENV === "development") {
    const timestamp = new Date().toISOString();
    const cleanUrl = url.replace("http://localhost:3000", "");
    const statusColor =
      status >= 400 ? "\x1b[31m" : status >= 300 ? "\x1b[33m" : "\x1b[32m";
    console.log(
      `\x1b[36m[${timestamp}]\x1b[0m \x1b[35m${method}\x1b[0m ${cleanUrl} - ${statusColor}${status}\x1b[0m${
        duration ? ` \x1b[90m(${duration}ms)\x1b[0m` : ""
      }`
    );
  }
}

// For production, you can add structured logging here
export function logError(error: Error, context?: Record<string, unknown>) {
  console.error("Error:", error.message, context);
}

export function logInfo(message: string, data?: Record<string, unknown>) {
  console.log(message, data);
}
