import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PasswordStrengthMeter } from '../../components/common/PasswordStrengthMeter';
import { validatePassword } from '../../utils/validation';
import { KeyRound, Lock, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

export const ChangePasswordScreen = () => {
  const { changePassword, navigateTo } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Enter your current password';
    }

    const { isValid } = validatePassword(newPassword);
    if (!newPassword) {
      newErrors.newPassword = 'Enter your new password';
    } else if (!isValid) {
      newErrors.newPassword = 'Password must meet all complexity requirements';
    } else if (newPassword === currentPassword) {
      newErrors.newPassword = 'New password cannot be the same as your current password';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigateTo('profile');
    } catch (err) {
      setErrors({ form: err.message || 'Failed to change password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', animation: 'fadeIn 0.25s ease' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Change Password</h1>
          <p className="page-subtitle">Update your account credentials following strict corporate complexity standards.</p>
        </div>

        <Button
          variant="secondary"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigateTo('profile')}
        >
          Back
        </Button>
      </div>

      <Card title="Security Credential Update">
        {errors.form && (
          <div className="auth-error-banner" style={{ marginBottom: '1.25rem' }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter existing password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (errors.currentPassword) setErrors((prev) => ({ ...prev, currentPassword: '' }));
            }}
            icon={Lock}
            error={errors.currentPassword}
            hint="For testing default demo accounts, default password is Password@123"
            required
            autoComplete="current-password"
          />

          <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '1.25rem 0' }} />

          <Input
            label="New Password"
            type="password"
            placeholder="Min 8 characters with symbol & number"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: '' }));
            }}
            icon={KeyRound}
            error={errors.newPassword}
            required
            autoComplete="new-password"
          />

          <PasswordStrengthMeter password={newPassword} />

          <div style={{ marginTop: '0.75rem' }}>
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }}
              icon={KeyRound}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigateTo('profile')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              icon={<ShieldCheck size={18} />}
            >
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
