import React from 'react';

export const Badge = ({
  children,
  variant = 'slate',
  dot = true,
  className = '',
  ...props
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()} {...props}>
      {dot && <span className="badge-dot" aria-hidden="true" />}
      {children}
    </span>
  );
};
