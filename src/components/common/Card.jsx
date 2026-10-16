import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  action,
  glass = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`card ${glass ? 'card-glass' : ''} ${className}`.trim()} {...props}>
      {(title || action) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div className="card-header-action">{action}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};
