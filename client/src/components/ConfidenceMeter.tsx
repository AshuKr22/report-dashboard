'use client';

interface ConfidenceMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ConfidenceMeter({ score, size = 'md' }: ConfidenceMeterProps) {
  const getColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'w-12 h-2';
      case 'lg': return 'w-24 h-4';
      default: return 'w-16 h-3';
    }
  };

  return (
    <div className={`bg-gray-200 rounded-full overflow-hidden ${getSizeClasses(size)}`}>
      <div 
        className={`h-full transition-all duration-500 ${getColor(score)}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}