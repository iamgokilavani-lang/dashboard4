import React, { useState } from 'react';

export const Avatar = ({
  src,
  name = 'User',
  size = 'md',
  status,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClass = `avatar-${size}`;

  return (
    <div className={`avatar-wrapper ${sizeClass} ${className}`.trim()}>
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          className="avatar-img"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="avatar-fallback" aria-label={name}>
          {initials || 'U'}
        </div>
      )}

      {status && (
        <span
          className={`avatar-status-dot ${status.toLowerCase()}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
};
