// Password & Form Validation Utilities

export const validatePassword = (password = '') => {
  const criteria = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password)
  };

  const satisfiedCount = Object.values(criteria).filter(Boolean).length;

  let strength = 'Weak';
  let color = 'var(--danger)';
  let percentage = 20;

  if (satisfiedCount <= 2) {
    strength = 'Weak';
    color = 'var(--danger)';
    percentage = Math.max(20, satisfiedCount * 20);
  } else if (satisfiedCount === 3) {
    strength = 'Fair';
    color = 'var(--warning)';
    percentage = 60;
  } else if (satisfiedCount === 4) {
    strength = 'Good';
    color = 'var(--info)';
    percentage = 80;
  } else if (satisfiedCount === 5) {
    strength = 'Strong';
    color = 'var(--success)';
    percentage = 100;
  }

  return {
    criteria,
    satisfiedCount,
    strength,
    color,
    percentage,
    isValid: satisfiedCount >= 4 && criteria.minLength
  };
};

export const validateEmail = (email = '') => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).trim());
};

export const validateUsername = (username = '') => {
  const re = /^[a-zA-Z0-9._-]{3,20}$/;
  return re.test(String(username).trim());
};
