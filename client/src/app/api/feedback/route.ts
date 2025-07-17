import { NextRequest } from "next/server";
import { FeedbackRequest } from "@/types";
import { requestMiddleware, createApiResponse, createErrorResponse } from "@/lib/middleware";

export async function POST(request: NextRequest) {
  const { startTime, traceId } = requestMiddleware(request);
  
  try {
    const body: FeedbackRequest = await request.json();
    
    // Validate required fields
    if (!body.reportId || !body.userComment) {
      return createErrorResponse("Missing required fields: reportId and userComment", request, startTime, traceId, 400);
    }
    
    // Simulate saving feedback (in real app, this would go to a database)
    const feedbackId = `feedback_${Date.now()}`;
    
    // Log the feedback submission
    console.log("Feedback submitted:", {
      id: feedbackId,
      reportId: body.reportId,
      userComment: body.userComment,
      flaggedSection: body.flaggedSection,
      rating: body.rating,
      timestamp: new Date().toISOString(),
      traceId
    });
    
    return createApiResponse({
      success: true,
      feedbackId,
      message: "Feedback submitted successfully",
      traceId
    }, request, startTime, traceId, 201);
    
  } catch (error) {
    return createErrorResponse("Failed to submit feedback", request, startTime, traceId, 500);
  }
}
