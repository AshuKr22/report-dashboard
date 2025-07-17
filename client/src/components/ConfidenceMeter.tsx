'use client';

import { useEffect, useState } from 'react';

interface ConfidenceMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  type?: 'bar' | 'dial';
}

export function ConfidenceMeter({ score, size = 'md', type = 'bar' }: ConfidenceMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (score: number) => {
    if (score >= 90) return {
      bg: 'bg-green-500',
      text: 'text-green-600',
      stroke: 'stroke-green-500'
    };
    if (score >= 80) return {
      bg: 'bg-yellow-500',
      text: 'text-yellow-600',
      stroke: 'stroke-yellow-500'
    };
    if (score >= 70) return {
      bg: 'bg-orange-500',
      text: 'text-orange-600',
      stroke: 'stroke-orange-500'
    };
    return {
      bg: 'bg-red-500',
      text: 'text-red-600',
      stroke: 'stroke-red-500'
    };
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return {
        bar: 'w-12 h-2',
        dial: 'w-12 h-12',
        strokeWidth: 2,
        fontSize: 'text-xs'
      };
      case 'lg': return {
        bar: 'w-24 h-4',
        dial: 'w-20 h-20',
        strokeWidth: 3,
        fontSize: 'text-sm'
      };
      default: return {
        bar: 'w-16 h-3',
        dial: 'w-16 h-16',
        strokeWidth: 2.5,
        fontSize: 'text-xs'
      };
    }
  };

  const colors = getColor(score);
  const sizeConfig = getSizeClasses(size);

  if (type === 'dial') {
    const radius = size === 'lg' ? 35 : size === 'sm' ? 18 : 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
    const center = size === 'lg' ? 40 : size === 'sm' ? 24 : 32;
    const viewBox = size === 'lg' ? '0 0 80 80' : size === 'sm' ? '0 0 48 48' : '0 0 64 64';

    return (
      <div className={`relative ${sizeConfig.dial}`}>
        <svg
          className="transform -rotate-90"
          width="100%"
          height="100%"
          viewBox={viewBox}
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="currentColor"
            strokeWidth={sizeConfig.strokeWidth}
            fill="none"
            className="text-muted opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="currentColor"
            strokeWidth={sizeConfig.strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colors.stroke} transition-all duration-1000 ease-out`}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${colors.text} ${sizeConfig.fontSize}`}>
            {Math.round(animatedScore)}
          </span>
        </div>
      </div>
    );
  }

  // Bar type (original)
  return (
    <div className={`bg-muted rounded-full overflow-hidden ${sizeConfig.bar}`}>
      <div 
        className={`h-full transition-all duration-1000 ease-out ${colors.bg}`}
        style={{ width: `${animatedScore}%` }}
      />
    </div>
  );
}