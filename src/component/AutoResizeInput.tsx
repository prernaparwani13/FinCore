import React, { useState, useEffect, useRef } from 'react';

interface AutoResizeInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  prefix?: string;
  suffix?: string;
  minWidth?: string;
  calculatorType?: string;
  className?: string;
  placeholder?: string;
  type?: 'text' | 'number';
  maxLength?: number;
}

/**
 * Returns consistent minWidth based on calculator type
 * This ensures all input fields have the same fixed width across every calculator
 */
const getConsistentMinWidth = (calculatorType?: string): string => {
  // Default consistent width for all calculators
  // You can customize this value based on requirements
  const defaultWidth = '100px';
  
  // Clean conditional on calculator type for specific customizations if needed
  // Currently returning consistent width for all calculator types
  switch (calculatorType) {
    case 'Salary Calculator':
    case 'EPF Calculator':
    case 'SIP Calculator':
    case 'PPF Calculator':
    case 'RD Calculator':
    case 'FD Calculator':
    case 'SWP Calculator':
    case 'SSY Calculator':
    case 'NSC Calculator':
    case 'SCSS Calculator':
    case 'Post Office MIS Calculator':
    case 'Gratuity Calculator':
    case 'Mortgage Payment':
    case 'Loan Amortization':
    case 'Auto Loan':
    case 'Compound Interest':
    case 'Simple Interest':
    case 'Lumpsum Calculator':
    case 'Mutual Funds Returns':
    case 'Inflation Calculator':
    case 'NPS Calculator':
    case 'ROI Calculator':
    case 'GST Calculator':
    case 'Retirement Planner':
    case 'Stock Average Calculator':
    case 'HRA Calculator':
      return defaultWidth;
    default:
      return defaultWidth;
  }
};

const AutoResizeInput: React.FC<AutoResizeInputProps> = ({
  value,
  onChange,
  onBlur,
  prefix = '',
  suffix = '',
  minWidth,
  calculatorType,
  className = '',
  placeholder = '0',
  type = 'text',
  maxLength
}) => {
  // Use consistent minWidth based on calculator type, or fall back to provided minWidth, or default
  const consistentMinWidth = minWidth || getConsistentMinWidth(calculatorType);
  
  const [inputWidth, setInputWidth] = useState(consistentMinWidth);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const text = value || placeholder;
      const fullText = prefix + text + suffix;
      measureRef.current.textContent = fullText || '0';
      
      // Get the width of the text
      const textWidth = measureRef.current.offsetWidth;
      
      // Add some padding for better UX
      const newWidth = Math.max(
        parseInt(consistentMinWidth), 
        textWidth + 16 // padding
      );
      
      setInputWidth(`${newWidth}px`);
    }
  }, [value, prefix, suffix, placeholder, consistentMinWidth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    if (type === 'number') {
      // Allow empty string for typing
      if (val === '' || val === '-') {
        onChange(val);
        return;
      }
      
      const numVal = Number(val);
      if (!isNaN(numVal)) {
        onChange(val);
      }
    } else {
      onChange(val);
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Hidden measurement span */}
      <span
        ref={measureRef}
        className="absolute invisible whitespace-pre pointer-events-none"
        style={{ font: 'inherit' }}
      />
      
      {/* Prefix */}
      {prefix && (
        <span className="text-blue-600 dark:text-blue-400 font-black text-sm mr-0.5">
          {prefix}
        </span>
      )}
      
      {/* Input */}
      <input
        ref={inputRef}
        type={type === 'number' ? 'text' : type}
        inputMode={type === 'number' ? 'decimal' : 'text'}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{ width: inputWidth, minWidth: minWidth }}
        className="bg-transparent outline-none border-none p-0 focus:ring-0 text-right font-black text-sm text-blue-600 dark:text-blue-400 "
      />
      
      {/* Suffix */}
      {suffix && (
        <span className="text-blue-600 dark:text-blue-400 font-black text-sm ml-0.5">
          {suffix}
        </span>
      )}
    </div>
  );
};

export default AutoResizeInput;
