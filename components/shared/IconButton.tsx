'use client';

import { Button } from '@/components/ui/button';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'ghost' | 'outline' | 'default';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export function IconButton({ 
  icon, 
  onClick, 
  disabled = false,
  variant = 'ghost',
  size = 'md',
  ariaLabel
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  return (
    <Button
      variant={variant}
      size="sm"
      className={`${sizeClasses[size]} p-0 flex items-center justify-center`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
}
