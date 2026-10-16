import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import {
  ShieldCheck,
  LayoutDashboard,
  User,
  UserCog,
  KeyRound,
  LogOut,
  X,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentScreen, navigateTo, currentUser, handleLogout } = useAuth();

  const handleNavClick = (screen) => {
    navigateTo(screen);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 95 }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <ShieldCheck size={20} />
            </div>
            <span>AuthVault</span>
          </div>

          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-label">Identity & Access</span>

          <button
            type="button"
            className={`nav-item ${currentScreen === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('dashboard')}
          >
            <span className="nav-item-icon">
              <LayoutDashboard size={18} />
            </span>
            <span>Access Dashboard</span>
          </button>

          <span className="nav-section-label">User Profile & Security</span>

          <button
            type="button"
            className={`nav-item ${currentScreen === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavClick('profile')}
          >
            <span className="nav-item-icon">
              <User size={18} />
            </span>
            <span>View Profile</span>
          </button>

          <button
            type="button"
            className={`nav-item ${currentScreen === 'edit-profile' ? 'active' : ''}`}
            onClick={() => handleNavClick('edit-profile')}
          >
            <span className="nav-item-icon">
              <UserCog size={18} />
            </span>
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            className={`nav-item ${currentScreen === 'change-password' ? 'active' : ''}`}
            onClick={() => handleNavClick('change-password')}
          >
            <span className="nav-item-icon">
              <KeyRound size={18} />
            </span>
            <span>Change Password</span>
          </button>

          <span className="nav-section-label">Authentication Screens</span>

          <button
            type="button"
            className="nav-item"
            onClick={() => handleNavClick('login')}
          >
            <span className="nav-item-icon">
              <ExternalLink size={18} />
            </span>
            <span>Login Screen</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => handleNavClick('register')}
          >
            <span className="nav-item-icon">
              <ExternalLink size={18} />
            </span>
            <span>Register Screen</span>
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => handleNavClick('forgot-password')}
          >
            <span className="nav-item-icon">
              <ShieldAlert size={18} />
            </span>
            <span>Forgot Password</span>
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <button
              type="button"
              className="nav-item"
              style={{ color: 'var(--danger)', width: '100%' }}
              onClick={handleLogout}
            >
              <span className="nav-item-icon">
                <LogOut size={18} />
              </span>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        {currentUser && (
          <div className="sidebar-footer">
            <div className="sidebar-user-card">
              <Avatar
                src={currentUser.avatar}
                name={currentUser.name}
                size="md"
                status={currentUser.status}
              />
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{currentUser.name}</div>
                <div className="sidebar-user-role">{currentUser.role}</div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
