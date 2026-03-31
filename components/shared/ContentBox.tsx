'use client';

interface ContentBoxProps {
  children: React.ReactNode;
  variant?: 'default' | 'muted';
  className?: string;
}

export function ContentBox({ children, variant = 'muted', className = '' }: ContentBoxProps) {
  const baseClasses = variant === 'muted' 
    ? 'bg-muted rounded-lg p-2 sm:p-3'
    : 'bg-background rounded-lg p-2 sm:p-3 border border-border';

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
