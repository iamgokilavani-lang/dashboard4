import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PasswordStrengthMeter } from '../../components/common/PasswordStrengthMeter';
import { validatePassword } from '../../utils/validation';
import { KeyRound, Lock, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const ResetPasswordScreen = () => {
  const { completeResetPassword, resetFlowData, navigateTo } = useAuth();

  const [token, setToken] = useState(resetFlowData.token || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (resetFlowData.token) {
      setToken(resetFlowData.token);
    }
  }, [resetFlowData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!token.trim()) {
      newErrors.token = 'Please enter the reset security code';
    }

    const { isValid } = validatePassword(newPassword);
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!isValid) {
      newErrors.newPassword = 'Password must meet all complexity requirements';
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
      await completeResetPassword(token, newPassword);
    } catch (err) {
      setErrors({ form: err.message || 'Password reset failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle={
        resetFlowData.email
          ? `Resetting password for verified identity: ${resetFlowData.email}`
          : 'Enter your verification code and set a strong new password.'
      }
    >
      {errors.form && (
        <div className="auth-error-banner" role="alert">
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Security Reset Token / Code"
          type="text"
          placeholder="e.g. SEC-123456"
          value={token}
          onChange={(e) => {
            setToken(e.target.value.toUpperCase());
            if (errors.token) setErrors((prev) => ({ ...prev, token: '' }));
          }}
          icon={KeyRound}
          error={errors.token}
          hint={resetFlowData.token ? 'Auto-filled from your recovery request' : undefined}
          required
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Min 8 characters with symbol & number"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: '' }));
          }}
          icon={Lock}
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
            icon={Lock}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
            icon={<CheckCircle2 size={18} />}
          >
            Update Password & Return to Login
          </Button>

          <Button
            variant="ghost"
            fullWidth
            icon={<ArrowLeft size={16} />}
            onClick={() => navigateTo('login')}
          >
            Back to Login
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};
