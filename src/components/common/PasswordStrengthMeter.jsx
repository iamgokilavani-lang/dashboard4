import React from 'react';
import { Check, X } from 'lucide-react';
import { validatePassword } from '../../utils/validation';

export const PasswordStrengthMeter = ({ password = '' }) => {
  if (!password) return null;

  const { criteria, strength, color, percentage } = validatePassword(password);

  return (
    <div className="password-strength-container" aria-live="polite">
      <div className="strength-meter-header">
        <span style={{ color: 'var(--text-secondary)' }}>Password Strength:</span>
        <span className="strength-label" style={{ color }}>
          {strength}
        </span>
      </div>

      <div className="strength-track">
        <div
          className="strength-bar"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>

      <ul className="password-criteria-list">
        <li className={`criteria-item ${criteria.minLength ? 'met' : 'unmet'}`}>
          {criteria.minLength ? <Check size={12} /> : <X size={12} />}
          <span>8+ Characters</span>
        </li>
        <li className={`criteria-item ${criteria.hasUpper ? 'met' : 'unmet'}`}>
          {criteria.hasUpper ? <Check size={12} /> : <X size={12} />}
          <span>Uppercase (A-Z)</span>
        </li>
        <li className={`criteria-item ${criteria.hasLower ? 'met' : 'unmet'}`}>
          {criteria.hasLower ? <Check size={12} /> : <X size={12} />}
          <span>Lowercase (a-z)</span>
        </li>
        <li className={`criteria-item ${criteria.hasNumber ? 'met' : 'unmet'}`}>
          {criteria.hasNumber ? <Check size={12} /> : <X size={12} />}
          <span>Number (0-9)</span>
        </li>
        <li className={`criteria-item ${criteria.hasSpecial ? 'met' : 'unmet'}`}>
          {criteria.hasSpecial ? <Check size={12} /> : <X size={12} />}
          <span>Special Symbol</span>
        </li>
      </ul>
    </div>
  );
};
