import React from 'react';
import { ShieldCheck, Lock, KeyRound, UserCheck, Moon, Sun, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AuthLayout = ({ children, title, subtitle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="auth-page-wrapper">
      <div className="app-background-mesh" />

      {/* Floating Theme Switcher */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
        <button
          type="button"
          className="topbar-icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="auth-container">
        {/* Left Hero & Value Proposition */}
        <div className="auth-hero-panel">
          <div className="auth-brand-header">
            <div className="auth-brand-logo">
              <div className="logo-icon">
                <ShieldCheck size={24} />
              </div>
              <span>AuthVault</span>
            </div>

            <h1 className="auth-hero-title">
              Enterprise Identity & <span>Zero-Trust</span> Access.
            </h1>
            <p className="auth-hero-subtitle">
              Secure identity federation, role-based access control, session enforcement, and comprehensive audit trails.
            </p>

            <div className="auth-features-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <Lock size={14} />
                </div>
                <div className="auth-feature-text">
                  <h4>End-to-End Session Security</h4>
                  <p>Real-time privilege checking and automated credential invalidation.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <UserCheck size={14} />
                </div>
                <div className="auth-feature-text">
                  <h4>Granular RBAC Governance</h4>
                  <p>Configurable roles, scoped permission matrix, and status suspension.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <KeyRound size={14} />
                </div>
                <div className="auth-feature-text">
                  <h4>Password Policy Enforcement</h4>
                  <p>Live complexity meters, verification flows, and audit tracking.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <div className="auth-trust-badge">
              <CheckCircle size={16} style={{ color: 'var(--success)' }} />
              <span>SOC2 Type II & ISO27001 Compliant</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>v2.4.0</span>
          </div>
        </div>

        {/* Right Dynamic Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <h2 className="auth-form-title">{title}</h2>
            {subtitle && <p className="auth-form-desc">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
