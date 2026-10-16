import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PasswordStrengthMeter } from '../../components/common/PasswordStrengthMeter';
import { validateEmail, validatePassword } from '../../utils/validation';
import { User, Mail, Lock, UserPlus, Building, Check, AlertCircle } from 'lucide-react';

export const RegisterScreen = () => {
  const { register, navigateTo } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Core Platform');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    const { isValid, criteria } = validatePassword(password);
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!isValid) {
      newErrors.password = 'Password must meet complexity requirements';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreed) {
      newErrors.agreed = 'You must agree to the identity governance policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register({
        fullName,
        email,
        department,
        password
      });
    } catch (err) {
      setErrors({ form: err.message || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Workspace Account"
      subtitle={
        <span>
          Already registered?{' '}
          <button
            type="button"
            className="auth-switch-link"
            style={{ background: 'none', border: 'none', padding: 0 }}
            onClick={() => navigateTo('login')}
          >
            Sign in here
          </button>
        </span>
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
          label="Full Name"
          type="text"
          placeholder="e.g. Aadhya Nair"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
          }}
          icon={User}
          error={errors.fullName}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
          <Input
            label="Work Email"
            type="email"
            placeholder="aadhya@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            icon={Mail}
            error={errors.email}
            required
            autoComplete="email"
          />

          <div className="form-group">
            <label className="form-label" htmlFor="register-dept">
              Department
            </label>
            <div className="input-container input-has-icon-left">
              <span className="input-icon-left">
                <Building size={16} />
              </span>
              <select
                id="register-dept"
                className="form-input"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Core Platform">Core Platform</option>
                <option value="Cyber Compliance">Cyber Compliance</option>
                <option value="Security & Infra">Security & Infra</option>
                <option value="Product Strategy">Product Strategy</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>
        </div>

        <Input
          label="Password"
          type="password"
          placeholder="Min 8 characters with symbol & number"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          icon={Lock}
          error={errors.password}
          required
          autoComplete="new-password"
        />

        {/* Live Password Strength Meter */}
        <PasswordStrengthMeter password={password} />

        <div style={{ marginTop: '0.75rem' }}>
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
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

        <div style={{ margin: '1rem 0' }}>
          <label className="checkbox-group">
            <input
              type="checkbox"
              style={{ display: 'none' }}
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: '' }));
              }}
            />
            <span className="checkbox-custom">
              {agreed && <Check size={12} strokeWidth={3} />}
            </span>
            <span style={{ fontSize: '0.8125rem' }}>
              I agree to the Zero-Trust Security Policy and Identity Terms.
            </span>
          </label>
          {errors.agreed && (
            <div className="input-error-msg" style={{ marginTop: '0.35rem' }}>
              <AlertCircle size={14} />
              <span>{errors.agreed}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          isLoading={isLoading}
          icon={<UserPlus size={18} />}
        >
          Complete Registration
        </Button>
      </form>
    </AuthLayout>
  );
};
