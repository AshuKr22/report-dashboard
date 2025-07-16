import { NextRequest, NextResponse } from "next/server";
import { logApiRequest, logApiResponse } from "@/lib/logger";
import { FeedbackRequest } from "@/types";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  logApiRequest(
    "POST",
    request.url,
    request.headers.get("user-agent") || undefined
  );

  try {
    const body: FeedbackRequest = await request.json();

    // Validate required fields
    if (!body.reportId || !body.userComment) {
      const duration = Date.now() - startTime;
      logApiResponse("POST", request.url, 400, duration);

      return NextResponse.json(
        { error: "Missing required fields: reportId and userComment" },
        { status: 400 }
      );
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
    });

    const duration = Date.now() - startTime;
    logApiResponse("POST", request.url, 201, duration);

    return NextResponse.json(
      {
        success: true,
        feedbackId,
        message: "Feedback submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logApiResponse("POST", request.url, 500, duration);

    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
