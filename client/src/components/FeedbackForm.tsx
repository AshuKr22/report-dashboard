"use client";

import { useState } from "react";
import { Send, AlertTriangle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FeedbackRequest } from "@/types";

interface FeedbackFormProps {
  reportId: string;
}

export function FeedbackForm({ reportId }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState<Partial<FeedbackRequest>>({
    reportId,
    userComment: "",
    flaggedSection: "",
    rating: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.userComment?.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setSubmitted(true);
        setFeedback({
          reportId,
          userComment: "",
          flaggedSection: "",
          rating: undefined,
        });
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFeedback((prev) => ({ ...prev, rating }));
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
          <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Thank You for Your Feedback!
        </h3>
        <p className="text-muted-foreground mb-4">
          Your input helps us improve our reports and analysis quality.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Submit Another Feedback
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Share Your Feedback
        </h3>
        <p className="text-sm text-muted-foreground">
          Help us improve by sharing your thoughts on this report&apos;s
          accuracy, completeness, and usefulness.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">
            How would you rate this report?
          </Label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                  feedback.rating && feedback.rating >= star
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600 hover:text-yellow-400"
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
            {feedback.rating && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({feedback.rating}/5)
              </span>
            )}
          </div>
        </div>

        {/* Comments */}
        <div>
          <Label
            htmlFor="userComment"
            className="text-sm font-medium text-foreground mb-2 block"
          >
            Your Comments <span className="text-red-500">*</span>
          </Label>
          <textarea
            id="userComment"
            value={feedback.userComment}
            onChange={(e) =>
              setFeedback((prev) => ({ ...prev, userComment: e.target.value }))
            }
            placeholder="Share your thoughts on the report's accuracy, completeness, or suggest improvements..."
            className="w-full min-h-[100px] px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background resize-y"
            required
          />
        </div>

        {/* Flag Section */}
        <div>
          <Label
            htmlFor="flaggedSection"
            className="text-sm font-medium text-foreground mb-2 block"
          >
            Flag Specific Section (Optional)
          </Label>
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-muted-foreground">
              Reference a specific part of the report if you found an issue
            </span>
          </div>
          <Input
            id="flaggedSection"
            value={feedback.flaggedSection}
            onChange={(e) =>
              setFeedback((prev) => ({
                ...prev,
                flaggedSection: e.target.value,
              }))
            }
            placeholder="e.g., 'Summary paragraph 2' or 'Data visualization on page 3'"
            className="w-full"
          />
        </div>

        {/* Quick Feedback Tags */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">
            Quick Feedback Tags
          </Label>
          <div className="flex flex-wrap gap-2">
            {[
              "Helpful insights",
              "Easy to understand",
              "Missing context",
              "Unclear data",
              "Excellent analysis",
              "Needs more detail",
            ].map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => {
                  const currentComment = feedback.userComment || "";
                  const newComment = currentComment
                    ? `${currentComment} #${tag}`
                    : `#${tag}`;
                  setFeedback((prev) => ({ ...prev, userComment: newComment }));
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !feedback.userComment?.trim()}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
