import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export const Input = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  hint,
  icon: Icon,
  optional = false,
  required = false,
  autoComplete,
  className = '',
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const inputId = id || name || `input-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div className={`form-group ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span>
            {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
          </span>
          {optional && <span className="optional">Optional</span>}
        </label>
      )}

      <div
        className={`input-container ${Icon ? 'input-has-icon-left' : ''} ${
          isPassword ? 'input-has-icon-right' : ''
        }`}
      >
        {Icon && (
          <span className="input-icon-left" aria-hidden="true">
            <Icon size={18} />
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={effectiveType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`form-input ${error ? 'has-error' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="input-icon-right"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <div id={`${inputId}-error`} className="input-error-msg" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {hint && !error && (
        <span id={`${inputId}-hint`} className="input-hint">
          {hint}
        </span>
      )}
    </div>
  );
};
