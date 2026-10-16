import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  User,
  Settings,
  KeyRound,
  LogOut,
  ChevronDown,
  Shield,
  CheckCircle2
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar, onSearchChange, searchQuery = '' }) => {
  const { currentUser, handleLogout, navigateTo, users, switchDemoAccount, auditLogs } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadgeVariant = (role) => {
    if (role === 'Super Admin') return 'purple';
    if (role === 'Security Officer') return 'blue';
    if (role === 'Engineering Lead') return 'emerald';
    return 'slate';
  };

  const recentAlerts = auditLogs.slice(0, 4);

  return (
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="topbar-search">
          <Search size={16} className="topbar-search-icon" />
          <input
            type="text"
            placeholder="Search users, roles, emails..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            aria-label="Search users and access records"
          />
        </div>
      </div>

      <div className="topbar-right">
        {/* Quick Persona Switcher for effortless demo testing */}
        <div className="persona-switcher" title="Switch between mock accounts">
          <Shield size={14} style={{ color: 'var(--primary)' }} />
          <select
            value={currentUser ? currentUser.id : ''}
            onChange={(e) => switchDemoAccount(e.target.value)}
            aria-label="Switch demo persona"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          className="topbar-icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            type="button"
            className="topbar-icon-btn"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label="Notifications"
            title="Recent Security Notifications"
          >
            <Bell size={18} />
            <span className="notification-indicator" />
          </button>

          {isNotifOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                zIndex: 110,
                overflow: 'hidden',
                animation: 'scaleIn 0.2s ease'
              }}
            >
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Security Alerts</span>
                <Badge variant="cyan" dot={false}>
                  Live
                </Badge>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {recentAlerts.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.action}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{log.timestamp}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {log.details}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current User Profile Dropdown */}
        {currentUser && (
          <div style={{ position: 'relative' }} ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: 'var(--radius-md)'
              }}
              aria-label="User profile menu"
            >
              <Avatar
                src={currentUser.avatar}
                name={currentUser.name}
                size="sm"
                status={currentUser.status}
              />
              <div style={{ textAlign: 'left', display: 'none' }} className="d-md-block">
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </div>
                <Badge variant={getRoleBadgeVariant(currentUser.role)} style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>
                  {currentUser.role}
                </Badge>
              </div>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </button>

            {isProfileMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '240px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 110,
                  padding: '0.5rem',
                  animation: 'scaleIn 0.2s ease'
                }}
              >
                <div
                  style={{
                    padding: '0.75rem 0.875rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    marginBottom: '0.35rem'
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {currentUser.name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.email}</p>
                </div>

                <button
                  type="button"
                  className="nav-item"
                  style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
                  onClick={() => {
                    navigateTo('profile');
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <User size={16} />
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  className="nav-item"
                  style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
                  onClick={() => {
                    navigateTo('edit-profile');
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <Settings size={16} />
                  <span>Edit Profile</span>
                </button>

                <button
                  type="button"
                  className="nav-item"
                  style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}
                  onClick={() => {
                    navigateTo('change-password');
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <KeyRound size={16} />
                  <span>Change Password</span>
                </button>

                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0.35rem 0' }} />

                <button
                  type="button"
                  className="nav-item"
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    border: 'none',
                    color: 'var(--danger)'
                  }}
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
