import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { AVATAR_PRESETS } from '../../data/mockData';
import { validateEmail } from '../../utils/validation';
import { User, Mail, Phone, MapPin, Building, Save, ArrowLeft, Camera, Check } from 'lucide-react';

export const EditProfileScreen = () => {
  const { currentUser, updateProfile, navigateTo } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    department: currentUser?.department || '',
    location: currentUser?.location || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || AVATAR_PRESETS[0]
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvatarSelect = (url) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(formData);
      navigateTo('profile');
    } catch (err) {
      setErrors({ form: err.message || 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.25s ease' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Profile Information</h1>
          <p className="page-subtitle">Update your personal contact details, department, and account avatar.</p>
        </div>

        <Button
          variant="secondary"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigateTo('profile')}
        >
          Back to Profile
        </Button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {errors.form && (
          <div className="auth-error-banner" style={{ marginBottom: '1.5rem' }}>
            <span>{errors.form}</span>
          </div>
        )}

        <Card title="Profile Avatar & Persona" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Avatar src={formData.avatar} name={formData.name} size="xl" />

            <div style={{ flex: 1 }}>
              <span className="detail-item-label" style={{ display: 'block', marginBottom: '0.625rem' }}>
                Select From Curated Avatars
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {AVATAR_PRESETS.map((avatarUrl, idx) => {
                  const isSelected = formData.avatar === avatarUrl;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAvatarSelect(avatarUrl)}
                      style={{
                        position: 'relative',
                        padding: 0,
                        border: isSelected ? '3px solid var(--primary)' : '2px solid transparent',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        background: 'transparent',
                        outline: 'none',
                        transition: 'transform var(--transition-fast)'
                      }}
                      title={`Select avatar preset ${idx + 1}`}
                    >
                      <Avatar src={avatarUrl} size="md" />
                      {isSelected && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: -2,
                            right: -2,
                            background: 'var(--primary)',
                            color: '#ffffff',
                            borderRadius: '50%',
                            width: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={11} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Personal & Organizational Details" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
              required
            />

            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              icon={User}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <Input
              label="Work Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={Phone}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              icon={Building}
              placeholder="e.g. Cyber Compliance"
            />

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              icon={MapPin}
              placeholder="e.g. San Francisco, CA"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Professional Bio / Mission</label>
            <textarea
              name="bio"
              className="form-textarea"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Brief description of your role, security responsibilities, and team affiliations."
            />
          </div>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
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
            icon={<Save size={16} />}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
