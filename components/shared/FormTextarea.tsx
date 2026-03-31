import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FaExclamationCircle } from 'react-icons/fa';

interface FormTextareaProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  error?: string | null;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minHeight?: string;
  className?: string;
  helperText?: string;
  rows?: number;
}

export function FormTextarea({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  disabled = false,
  required = false,
  maxLength,
  minHeight = 'min-h-20',
  className,
  helperText,
  rows = 3,
}: FormTextareaProps) {
  const charCount = maxLength ? `${value.length}/${maxLength}` : null;

  return (
    <div className="space-y-1 sm:space-y-2 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
          {charCount && (
            <span className="text-xs text-muted-foreground">{charCount}</span>
          )}
        </div>
      )}
      <div className="relative">
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            `text-sm w-full resize-none ${minHeight}`,
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
        />
        {error && (
          <div className="absolute right-3 top-3 text-destructive">
            <FaExclamationCircle className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <FaExclamationCircle className="w-3 h-3" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
