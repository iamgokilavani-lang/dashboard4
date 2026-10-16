import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  type = 'button',
  onClick,
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const fullWidthClass = fullWidth ? 'btn-full' : '';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${fullWidthClass} ${className}`.trim()}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="btn-icon-wrapper">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="btn-icon-wrapper">{icon}</span>}
        </>
      )}
    </button>
  );
};
