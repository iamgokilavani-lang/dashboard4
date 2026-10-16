import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { validateEmail } from '../../utils/validation';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, AlertCircle, Copy, ArrowRight } from 'lucide-react';

export const ForgotPasswordScreen = () => {
  const { initiateForgotPassword, navigateTo, resetFlowData } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your account email address');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const result = await initiateForgotPassword(email);
      setGeneratedCode(result.token);
    } catch (err) {
      setError(err.message || 'Failed to initiate password reset');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your verified work email and we will issue a secure authentication recovery token."
    >
      {error && (
        <div className="auth-error-banner" role="alert">
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{error}</span>
        </div>
      )}

      {!generatedCode ? (
        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Account Email Address"
            type="email"
            placeholder="e.g. gokilavani@authvault.io"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            icon={Mail}
            hint="For testing, use any registered email like gokilavani@authvault.io or priya.s@authvault.io"
            required
            autoComplete="email"
          />

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isLoading}
              icon={<KeyRound size={18} />}
            >
              Generate Reset Security Token
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
      ) : (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: 'var(--success-light)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <CheckCircle2 size={24} />
            </div>

            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Reset Token Dispatched
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              A simulated one-time password reset code has been generated for <strong>{email}</strong>:
            </p>

            <div className="demo-token-box">
              <span className="demo-token-content">{generatedCode}</span>
              <button
                type="button"
                className="btn-icon btn-secondary"
                onClick={handleCopyCode}
                title="Copy token"
              >
                {copied ? <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> : <Copy size={16} />}
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              This token expires in 15 minutes. Use it on the next screen to define your new password.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Button
              variant="primary"
              fullWidth
              size="lg"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              onClick={() => navigateTo('reset-password')}
            >
              Proceed to Reset Password
            </Button>

            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                setGeneratedCode('');
                setEmail('');
              }}
            >
              Request Another Code
            </Button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};
