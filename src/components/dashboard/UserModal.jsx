import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { AVAILABLE_ROLES, PERMISSION_DEFINITIONS } from '../../data/mockData';
import { validateEmail } from '../../utils/validation';

export const UserModal = ({
  isOpen,
  onClose,
  onSubmit,
  user = null, // if null -> Create mode, if provided -> Edit mode
  title
}) => {
  const isEdit = Boolean(user);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    department: 'Core Platform',
    role: 'Team Member',
    status: 'Active',
    accessLevel: 'Standard',
    twoFactorEnabled: false,
    permissions: ['users:read']
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
        department: user.department || 'Operations',
        role: user.role || 'Team Member',
        status: user.status || 'Active',
        accessLevel: user.accessLevel || 'Standard',
        twoFactorEnabled: Boolean(user.twoFactorEnabled),
        permissions: user.permissions || ['users:read']
      });
    } else {
      setFormData({
        name: '',
        username: '',
        email: '',
        password: 'Password@123',
        department: 'Engineering',
        role: 'Team Member',
        status: 'Active',
        accessLevel: 'Read Only',
        twoFactorEnabled: false,
        permissions: ['users:read']
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePermissionToggle = (permKey) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(permKey);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((p) => p !== permKey)
          : [...prev.permissions, permKey]
      };
    });
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    const roleDef = AVAILABLE_ROLES.find((r) => r.name === selectedRole);
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
      permissions: roleDef ? [...roleDef.permissions] : prev.permissions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!isEdit && !formData.password.trim()) {
      newErrors.password = 'Initial password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Operation failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || (isEdit ? `Edit User: ${user?.name}` : 'Provision New Identity')}
      maxWidth="620px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            {isEdit ? 'Save Changes' : 'Create User'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {errors.form && (
          <div className="auth-error-banner" style={{ marginBottom: '1rem' }}>
            <span>{errors.form}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Meera Krishnan"
            error={errors.name}
            required
          />

          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="e.g. meera.k"
            error={errors.username}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="meera@authvault.io"
            error={errors.email}
            required
          />

          {!isEdit ? (
            <Input
              label="Temporary Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 8 characters"
              error={errors.password}
              required
            />
          ) : (
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                className="form-input"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
              />
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="user-role-select">
              Assigned Role
            </label>
            <select
              id="user-role-select"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleRoleChange}
            >
              {AVAILABLE_ROLES.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="user-status-select">
              Account Status
            </label>
            <select
              id="user-status-select"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Permissions Scope Checklist */}
        <div style={{ marginTop: '0.75rem' }}>
          <label className="form-label" style={{ marginBottom: '0.5rem' }}>
            <span>Scoped Privileges & Permissions ({formData.permissions.length} active)</span>
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '0.5rem',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              maxHeight: '160px',
              overflowY: 'auto'
            }}
          >
            {PERMISSION_DEFINITIONS.map((perm) => (
              <label
                key={perm.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(perm.key)}
                  onChange={() => handlePermissionToggle(perm.key)}
                />
                <span>{perm.label}</span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
};
