import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Shield,
  KeyRound,
  Edit3,
  LogOut,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const UserProfileScreen = () => {
  const { currentUser, navigateTo, handleLogout } = useAuth();

  if (!currentUser) return null;

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'Super Admin':
        return 'purple';
      case 'Security Officer':
        return 'blue';
      case 'Engineering Lead':
        return 'emerald';
      case 'Product Manager':
        return 'amber';
      default:
        return 'slate';
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Profile Card Header with Gradient Cover */}
      <div
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2rem'
        }}
      >
        <div className="profile-cover">
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              color: '#ffffff',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShieldCheck size={14} />
            <span>Verified Identity</span>
          </div>
        </div>

        <div className="profile-card-header">
          <div className="profile-avatar-info">
            <Avatar
              src={currentUser.avatar}
              name={currentUser.name}
              size="xl"
              status={currentUser.status}
              style={{ border: '4px solid var(--bg-surface)' }}
            />
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </h1>
                <Badge variant={getRoleBadgeVariant(currentUser.role)} style={{ fontSize: '0.8125rem' }}>
                  {currentUser.role}
                </Badge>
                <Badge variant={currentUser.status === 'Active' ? 'emerald' : 'rose'}>
                  {currentUser.status}
                </Badge>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                @{currentUser.username} &bull; {currentUser.department}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              icon={<Edit3 size={16} />}
              onClick={() => navigateTo('edit-profile')}
            >
              Edit Profile
            </Button>
            <Button
              variant="secondary"
              icon={<KeyRound size={16} />}
              onClick={() => navigateTo('change-password')}
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              icon={<LogOut size={16} />}
              onClick={handleLogout}
              style={{ color: 'var(--danger)' }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of Profile Details & Access Scopes */}
      <div className="profile-details-grid">
        {/* Left Column: Personal Info & Security Policy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Account Overview & Contact">
            <div className="details-list">
              <div>
                <span className="detail-item-label">Work Email</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={15} style={{ color: 'var(--text-muted)' }} />
                  <span className="detail-item-value">{currentUser.email}</span>
                </div>
              </div>

              <div>
                <span className="detail-item-label">Phone Number</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={15} style={{ color: 'var(--text-muted)' }} />
                  <span className="detail-item-value">{currentUser.phone || 'Not provided'}</span>
                </div>
              </div>

              <div>
                <span className="detail-item-label">Location / Region</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={15} style={{ color: 'var(--text-muted)' }} />
                  <span className="detail-item-value">{currentUser.location || 'Remote'}</span>
                </div>
              </div>

              <div>
                <span className="detail-item-label">Department</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building size={15} style={{ color: 'var(--text-muted)' }} />
                  <span className="detail-item-value">{currentUser.department || 'General'}</span>
                </div>
              </div>

              <div>
                <span className="detail-item-label">Account Joined</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={15} style={{ color: 'var(--text-muted)' }} />
                  <span className="detail-item-value">{currentUser.joinedDate || '2024-01-01'}</span>
                </div>
              </div>

              <div>
                <span className="detail-item-label">Last Active Session</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={15} style={{ color: 'var(--text-muted)' }} />
                  <span className="detail-item-value">{currentUser.lastLogin || 'Just now'}</span>
                </div>
              </div>
            </div>

            {currentUser.bio && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span className="detail-item-label">Biography & Notes</span>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.25rem' }}>
                  {currentUser.bio}
                </p>
              </div>
            )}
          </Card>

          {/* Security Credentials Card */}
          <Card title="Security & Authentication Status">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Lock size={18} style={{ color: 'var(--primary)' }} />
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 600 }}>Account Password</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Last updated recently &bull; Meets complexity standards
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateTo('change-password')}
                >
                  Update
                </Button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Shield size={18} style={{ color: 'var(--success)' }} />
                  <div>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 600 }}>Two-Factor Authentication (2FA)</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Hardware security keys & TOTP authenticator app
                    </p>
                  </div>
                </div>
                <Badge variant={currentUser.twoFactorEnabled ? 'emerald' : 'amber'}>
                  {currentUser.twoFactorEnabled ? 'Active & Enforced' : 'Optional'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Scoped Access Scopes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card
            title="Scoped Privileges & Scopes"
            subtitle={`${currentUser.permissions?.length || 1} active capabilities`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {(currentUser.permissions || ['users:read']).map((scope) => (
                <div
                  key={scope}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8125rem'
                  }}
                >
                  <CheckCircle2 size={15} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{scope}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                padding: '0.875rem',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}
            >
              <strong>Governance Notice:</strong> Privileges are centrally managed according to least privilege access policies. Contact your Security Officer to request role elevation.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
