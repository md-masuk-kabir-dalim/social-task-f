'use client';

interface ContentProps {
  text: string;
  className?: string;
}

export function Content({ text, className = '' }: ContentProps) {
  return (
    <p className={`text-xs sm:text-sm text-foreground wrap-break-word ${className}`}>
      {text}
    </p>
  );
}
