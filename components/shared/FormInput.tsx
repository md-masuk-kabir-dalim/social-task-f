import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FaExclamationCircle } from 'react-icons/fa';

interface FormInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string | null;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  className?: string;
  helperText?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = 'text',
  disabled = false,
  required = false,
  autoComplete,
  maxLength,
  className,
  helperText,
}: FormInputProps) {
  return (
    <div className="space-y-1 sm:space-y-2 w-full">
      {label && (
        <label className="text-xs sm:text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={cn(
            'text-sm w-full',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
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
