'use client';

import { Button } from '@/components/ui/button';

interface ActionButton {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  responsive?: boolean;
}

export function ActionButtons({ 
  buttons, 
  size = 'md',
  layout = 'horizontal',
  responsive = true
}: ActionButtonsProps) {
  const containerClass = layout === 'horizontal' 
    ? responsive ? 'flex items-center gap-1 sm:gap-2' : 'flex items-center gap-2'
    : 'flex flex-col gap-1 sm:gap-2';

  const sizeClasses = {
    sm: 'h-6 sm:h-7 text-xs gap-1 p-1 sm:p-2',
    md: 'h-8 sm:h-10 text-xs sm:text-sm gap-1 sm:gap-2 flex-1',
    lg: 'h-10 text-sm gap-2 flex-1'
  };

  return (
    <div className={containerClass}>
      {buttons.map((btn, idx) => (
        <Button
          key={idx}
          variant={btn.variant === 'destructive' ? 'destructive' : 'ghost'}
          size="sm"
          className={`${sizeClasses[size]} ${responsive ? 'sm:flex-none' : ''}`}
          onClick={btn.onClick}
          disabled={btn.disabled}
        >
          <span className={responsive ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-4 h-4'}>
            {btn.icon}
          </span>
          {btn.label && <span className={responsive ? 'hidden sm:inline' : 'inline'}>{btn.label}</span>}
        </Button>
      ))}
    </div>
  );
}
