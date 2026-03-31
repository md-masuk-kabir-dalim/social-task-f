'use client';

import { Button } from '@/components/ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface LikeButtonProps {
  isLiked: boolean;
  count?: number;
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function LikeButton({ 
  isLiked, 
  count, 
  onClick, 
  disabled = false,
  size = 'md',
  showText = true
}: LikeButtonProps) {
  const sizeClasses = {
    sm: 'h-6 sm:h-7 text-xs gap-1 p-1 sm:p-2',
    md: 'h-8 sm:h-10 text-xs sm:text-sm gap-1 sm:gap-2',
    lg: 'h-10 text-sm gap-2'
  };

  const iconClasses = {
    sm: 'w-3 h-3',
    md: 'w-3 h-3 sm:w-4 sm:h-4',
    lg: 'w-4 h-4'
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={sizeClasses[size]}
      onClick={onClick}
      disabled={disabled}
    >
      {isLiked ? (
        <FaHeart className={`${iconClasses[size]} text-destructive`} />
      ) : (
        <FaRegHeart className={iconClasses[size]} />
      )}
      {showText && (
        <span>
          {count ? count : isLiked ? 'Liked' : 'Like'}
        </span>
      )}
    </Button>
  );
}
