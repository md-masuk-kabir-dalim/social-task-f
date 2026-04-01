import { useState, useCallback } from 'react';

interface UseInputOptions {
  initialValue?: string;
  onValidate?: (value: string) => string | null;
  maxLength?: number;
}

interface UseInputReturn {
  value: string;
  setValue: (value: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: () => void;
  reset: () => void;
  isValid: boolean;
}

export function useInput(options: UseInputOptions = {}): UseInputReturn {
  const { initialValue = '', onValidate, maxLength } = options;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let newValue = e.target.value;

      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      setValue(newValue);

      if (touched && onValidate) {
        const validationError = onValidate(newValue);
        setError(validationError);
      }
    },
    [touched, onValidate, maxLength]
  );

  const handleBlur = useCallback(() => {
    setTouched(true);
    if (onValidate) {
      const validationError = onValidate(value);
      setError(validationError);
    }
  }, [value, onValidate]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
  }, [initialValue]);

  const isValid = !error && value.length > 0;

  return {
    value,
    setValue,
    error,
    setError,
    handleChange,
    handleBlur,
    reset,
    isValid,
  };
}
