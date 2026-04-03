"use client";

interface StatItem {
  label: string;
  value: number;
  onClick?: () => void;
  disabled?: boolean;
}

interface StatBarProps {
  stats: StatItem[];
  className?: string;
}

export function StatBar({ stats, className = "" }: StatBarProps) {
  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground py-2 sm:py-3 border-y border-border ${className}`}
    >
      {stats.map((stat, idx) => (
        <button
          key={idx}
          onClick={stat.onClick}
          disabled={stat.disabled}
          className="hover:text-primary transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {stat.value} {stat.label}
        </button>
      ))}
    </div>
  );
}
