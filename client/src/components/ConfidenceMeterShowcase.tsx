'use client';

import { ConfidenceMeter } from './ConfidenceMeter';

export function ConfidenceMeterShowcase() {
  const scores = [95, 82, 76, 64];
  const labels = ['Excellent', 'Good', 'Fair', 'Poor'];

  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Confidence Meters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dial Meters */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Dial Style</h4>
          <div className="grid grid-cols-2 gap-6">
            {scores.map((score, index) => (
              <div key={index} className="text-center">
                <ConfidenceMeter score={score} size="md" type="dial" />
                <div className="mt-2">
                  <div className="text-sm font-medium text-foreground">{score}%</div>
                  <div className="text-xs text-muted-foreground">{labels[index]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Meters */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Bar Style</h4>
          <div className="space-y-4">
            {scores.map((score, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-right">
                  <div className="text-sm font-medium text-foreground">{score}%</div>
                  <div className="text-xs text-muted-foreground">{labels[index]}</div>
                </div>
                <div className="flex-1">
                  <ConfidenceMeter score={score} size="md" type="bar" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-2">Color Coding</h5>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>90-100%: Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>80-89%: Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>70-79%: Fair</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Below 70%: Poor</span>
          </div>
        </div>
      </div>
    </div>
  );
}