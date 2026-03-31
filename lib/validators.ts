// Common validation functions for input fields

export const validators = {
  email: (value: string): string | null => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return null;
  },

  password: (value: string, minLength = 6): string | null => {
    if (!value) return 'Password is required';
    if (value.length < minLength) return `Password must be at least ${minLength} characters`;
    return null;
  },

  name: (value: string, minLength = 2): string | null => {
    if (!value) return 'Name is required';
    if (value.length < minLength) return `Name must be at least ${minLength} characters`;
    return null;
  },

  required: (value: string, fieldName = 'This field'): string | null => {
    if (!value || !value.trim()) return `${fieldName} is required`;
    return null;
  },

  minLength: (value: string, min: number, fieldName = 'This field'): string | null => {
    if (!value) return null;
    if (value.length < min) return `${fieldName} must be at least ${min} characters`;
    return null;
  },

  maxLength: (value: string, max: number, fieldName = 'This field'): string | null => {
    if (!value) return null;
    if (value.length > max) return `${fieldName} must not exceed ${max} characters`;
    return null;
  },

  url: (value: string): string | null => {
    if (!value) return 'URL is required';
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  phone: (value: string): string | null => {
    if (!value) return 'Phone number is required';
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
    return null;
  },

  match: (value: string, compareValue: string, fieldName = 'Passwords'): string | null => {
    if (value !== compareValue) return `${fieldName} do not match`;
    return null;
  },
};

// Helper to combine multiple validators
export function combineValidators(
  value: string,
  ...validatorFunctions: ((val: string) => string | null)[]
): string | null {
  for (const validator of validatorFunctions) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
}
