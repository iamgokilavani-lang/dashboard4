import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { validateEmail } from '../../utils/validation';
import { Mail, Lock, LogIn, Sparkles, Check, AlertCircle } from 'lucide-react';

export const LoginScreen = () => {
  const { login, rememberedEmail, navigateTo, users } = useAuth();

  const [email, setEmail] = useState(rememberedEmail || 'gokilavani@authvault.io');
  const [password, setPassword] = useState('Password@123');
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please provide a valid email format');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, rememberMe);
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = (demoEmail, demoPass = 'Password@123') => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={
        <span>
          Don't have an account yet?{' '}
          <button
            type="button"
            className="auth-switch-link"
            style={{ background: 'none', border: 'none', padding: 0 }}
            onClick={() => navigateTo('register')}
          >
            Create an account
          </button>
        </span>
      }
    >
      {/* Quick Demo Autofill Pills */}
      <div className="demo-accounts-bar">
        <div className="demo-accounts-label">
          <Sparkles size={13} style={{ color: 'var(--primary)' }} />
          <span>Quick Demo One-Click Login</span>
        </div>
        <div className="demo-pills">
          <button
            type="button"
            className="demo-pill-btn"
            onClick={() => handleFillDemo('gokilavani@authvault.io')}
          >
            Super Admin (Gokilavani)
          </button>
          <button
            type="button"
            className="demo-pill-btn"
            onClick={() => handleFillDemo('priya.s@authvault.io')}
          >
            Security Officer (Priya)
          </button>
          <button
            type="button"
            className="demo-pill-btn"
            onClick={() => handleFillDemo('arjun.v@authvault.io')}
          >
            Team Lead (Arjun)
          </button>
        </div>
      </div>

      {error && (
        <div className="auth-error-banner" role="alert">
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Work Email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          icon={Mail}
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError('');
          }}
          icon={Lock}
          required
          autoComplete="current-password"
        />

        <div className="auth-form-actions">
          <label className="checkbox-group">
            <input
              type="checkbox"
              style={{ display: 'none' }}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkbox-custom">
              {rememberMe && <Check size={12} strokeWidth={3} />}
            </span>
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="auth-switch-link"
            style={{ fontSize: '0.8125rem', background: 'none', border: 'none' }}
            onClick={() => navigateTo('forgot-password')}
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          isLoading={isLoading}
          icon={<LogIn size={18} />}
        >
          Sign In to Dashboard
        </Button>
      </form>
    </AuthLayout>
  );
};
