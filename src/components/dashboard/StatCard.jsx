import React from 'react';

export const StatCard = ({
  label,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  variant = 'primary'
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card-info">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value">{value}</span>
        {change && (
          <span className={`stat-card-change ${changeType}`}>
            {change}
          </span>
        )}
      </div>

      {Icon && (
        <div className={`stat-card-icon ${variant}`}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
};
