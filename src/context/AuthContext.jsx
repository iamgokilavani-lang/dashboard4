import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_USERS, DEFAULT_AUDIT_LOGS } from '../data/mockData';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();

  // Load registered users from localStorage or default
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('authvault_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const nameMap = {
          'usr-1': { name: 'Gokilavani', username: 'gokilavani', email: 'gokilavani@authvault.io' },
          'usr-2': { name: 'Priya Sharma', username: 'priya.sharma', email: 'priya.s@authvault.io', location: 'Mumbai, India', phone: '+91 98765 43210' },
          'usr-3': { name: 'Arjun Verma', username: 'arjun.verma', email: 'arjun.v@authvault.io', location: 'Hyderabad, India', phone: '+91 98765 43211' },
          'usr-4': { name: 'Ananya Iyer', username: 'ananya.iyer', email: 'ananya.i@authvault.io', location: 'Chennai, India', phone: '+91 98765 43212' },
          'usr-5': { name: 'Karthik Sundaram', username: 'karthik.s', email: 'karthik.s@authvault.io', location: 'Pune, India', phone: '+91 98765 43213' },
          'usr-6': { name: 'Deepa Patel', username: 'deepa.patel', email: 'deepa.p@authvault.io', location: 'Ahmedabad, India', phone: '+91 98765 43214' },
          'usr-7': { name: 'Rajesh Nambiar', username: 'rajesh.nambiar', email: 'rajesh.n@authvault.io', location: 'Kochi, India', phone: '+91 98765 43215' }
        };

        return parsed.map((u) => {
          if (nameMap[u.id]) {
            return { ...u, ...nameMap[u.id] };
          }
          return u;
        });
      } catch (e) {
        console.error('Failed to parse saved users', e);
      }
    }
    return DEFAULT_USERS;
  });

  // Load audit logs from localStorage or default
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('authvault_audit_logs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((log) => {
          let user = log.user;
          if (user === 'Alex Vance') user = 'Gokilavani';
          if (user === 'Elena Rostova') user = 'Priya Sharma';
          if (user === 'Marcus Chen') user = 'Arjun Verma';
          if (user === 'David Kim') user = 'Karthik Sundaram';
          if (user === 'Sarah Jenkins') user = 'Ananya Iyer';
          if (user === 'Jordan Hayes') user = 'Rajesh Nambiar';

          let details = log.details;
          details = details.replace(/Marcus Chen/g, 'Arjun Verma')
            .replace(/David Kim/g, 'Karthik Sundaram')
            .replace(/Sarah Jenkins/g, 'Ananya Iyer')
            .replace(/Elena Rostova/g, 'Priya Sharma');

          return { ...log, user, details };
        });
      } catch (e) {
        console.error('Failed to parse saved audit logs', e);
      }
    }
    return DEFAULT_AUDIT_LOGS;
  });

  // Current logged in user (persisted or null)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('authvault_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'usr-1' || parsed.name === 'Alex Vance') {
          return {
            ...parsed,
            name: 'Gokilavani',
            username: 'gokilavani',
            email: 'gokilavani@authvault.io'
          };
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse current user', e);
      }
    }
    return DEFAULT_USERS[0];
  });

  // Remembered email for Login screen
  const [rememberedEmail, setRememberedEmail] = useState(() => {
    const saved = localStorage.getItem('authvault_remember_email');
    if (saved === 'alex.vance@authvault.io' || !saved) {
      return 'gokilavani@authvault.io';
    }
    return saved;
  });

  // Active Screen Routing: 'login' | 'register' | 'forgot-password' | 'reset-password' | 'dashboard' | 'profile' | 'edit-profile' | 'change-password'
  const [currentScreen, setCurrentScreen] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const validScreens = [
      'login',
      'register',
      'forgot-password',
      'reset-password',
      'dashboard',
      'profile',
      'edit-profile',
      'change-password'
    ];
    if (validScreens.includes(hash)) {
      return hash;
    }
    return 'dashboard';
  });

  // Reset token simulation store
  const [resetFlowData, setResetFlowData] = useState({
    email: '',
    token: '',
    timestamp: null
  });

  // Confirmation Modal global state
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger', // 'danger' | 'warning' | 'primary'
    onConfirm: () => {}
  });

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem('authvault_users', JSON.stringify(users));
  }, [users]);

  // Sync audit logs to localStorage
  useEffect(() => {
    localStorage.setItem('authvault_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Sync current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('authvault_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('authvault_current_user');
    }
  }, [currentUser]);

  // Sync hash in browser URL for pleasant navigation & reloading
  useEffect(() => {
    window.location.hash = currentScreen;
  }, [currentScreen]);

  // Listen to hash changes (browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validScreens = [
        'login',
        'register',
        'forgot-password',
        'reset-password',
        'dashboard',
        'profile',
        'edit-profile',
        'change-password'
      ];
      if (validScreens.includes(hash)) {
        setCurrentScreen(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Helper to add audit logs
  const logAudit = (action, details, status = 'Success', customUser = null) => {
    const newLog = {
      id: 'log-' + Date.now(),
      user: customUser || (currentUser ? currentUser.name : 'Unauthenticated Visitor'),
      action,
      details,
      ip: '192.168.1.' + Math.floor(Math.random() * 200 + 10),
      location: 'Localhost Session',
      status,
      timestamp: 'Just now'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Safe navigation with route protection
  const navigateTo = (screen) => {
    const protectedScreens = ['dashboard', 'profile', 'edit-profile', 'change-password'];
    if (protectedScreens.includes(screen) && !currentUser) {
      showToast('Please login to access protected screens', 'warning');
      setCurrentScreen('login');
      return;
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open confirmation modal helper
  const openConfirmModal = ({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger', onConfirm }) => {
    setConfirmationModal({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      type,
      onConfirm: () => {
        onConfirm();
        closeConfirmModal();
      }
    });
  };

  const closeConfirmModal = () => {
    setConfirmationModal((prev) => ({ ...prev, isOpen: false }));
  };

  // --- Auth Actions ---

  // Login
  const login = async (email, password, remember = false) => {
    // Simulated network delay
    await new Promise((r) => setTimeout(r, 600));

    const foundUser = users.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (!foundUser) {
      logAudit('Failed Login', `Unknown email attempted: ${email}`, 'Danger');
      throw new Error('No account found with this email address.');
    }

    if (foundUser.status === 'Suspended') {
      logAudit('Failed Login', `Suspended user attempted login: ${email}`, 'Danger', foundUser.name);
      throw new Error('This account has been suspended by an administrator. Please contact security support.');
    }

    if (foundUser.password !== password) {
      logAudit('Failed Login', `Incorrect password for ${email}`, 'Danger', foundUser.name);
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Update remember me
    if (remember) {
      localStorage.setItem('authvault_remember_email', email);
      setRememberedEmail(email);
    } else {
      localStorage.removeItem('authvault_remember_email');
      setRememberedEmail('');
    }

    // Update lastLogin
    const updatedUser = {
      ...foundUser,
      lastLogin: 'Just now'
    };

    setUsers((prev) => prev.map((u) => (u.id === foundUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    logAudit('User Login', 'User successfully authenticated via credentials', 'Success', updatedUser.name);
    showToast(`Welcome back, ${updatedUser.name}!`, 'success');
    navigateTo('dashboard');
    return updatedUser;
  };

  // Register
  const register = async (userData) => {
    await new Promise((r) => setTimeout(r, 700));

    const exists = users.some(
      (u) => u.email.trim().toLowerCase() === userData.email.trim().toLowerCase()
    );

    if (exists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: 'usr-' + (users.length + 1) + '-' + Date.now().toString(36),
      name: userData.fullName.trim(),
      username: userData.username ? userData.username.trim() : userData.email.split('@')[0],
      email: userData.email.trim(),
      password: userData.password,
      role: 'Team Member',
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.fullName)}`,
      department: userData.department || 'Operations',
      phone: userData.phone || '+1 (555) 000-0000',
      location: userData.location || 'Remote',
      bio: userData.bio || 'New member of the organization.',
      status: 'Active',
      twoFactorEnabled: false,
      joinedDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Just now',
      permissions: ['users:read'],
      accessLevel: 'Standard User'
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    logAudit('User Registration', `New user account created: ${newUser.email}`, 'Success', newUser.name);
    showToast('Registration successful! Welcome to AuthVault.', 'success');
    navigateTo('dashboard');
    return newUser;
  };

  // Forgot password flow
  const initiateForgotPassword = async (email) => {
    await new Promise((r) => setTimeout(r, 600));

    const targetUser = users.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (!targetUser) {
      throw new Error('No account found associated with this email address.');
    }

    // Generate mock 6-digit OTP code & token
    const token = 'SEC-' + Math.floor(100000 + Math.random() * 900000);
    const flowData = {
      email: targetUser.email,
      token,
      timestamp: Date.now()
    };

    setResetFlowData(flowData);
    logAudit('Password Reset Requested', `Reset OTP generated for ${targetUser.email}`, 'Warning', targetUser.name);
    showToast(`Password reset code generated: ${token}`, 'info', 6000);
    return flowData;
  };

  // Reset password flow
  const completeResetPassword = async (token, newPassword) => {
    await new Promise((r) => setTimeout(r, 600));

    if (!resetFlowData.email) {
      throw new Error('No active password reset request found. Please initiate a new request.');
    }

    if (resetFlowData.token.toUpperCase() !== token.trim().toUpperCase()) {
      throw new Error('Invalid or expired reset security token. Please check the code.');
    }

    const userToUpdate = users.find(
      (u) => u.email.toLowerCase() === resetFlowData.email.toLowerCase()
    );

    if (!userToUpdate) {
      throw new Error('Target user not found.');
    }

    const updated = {
      ...userToUpdate,
      password: newPassword
    };

    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    if (currentUser && currentUser.id === updated.id) {
      setCurrentUser(updated);
    }

    logAudit('Password Reset', `Password successfully reset via token`, 'Success', updated.name);
    setResetFlowData({ email: '', token: '', timestamp: null });
    showToast('Password updated successfully! Please log in with your new credentials.', 'success');
    navigateTo('login');
  };

  // Edit current user profile
  const updateProfile = async (profileData) => {
    if (!currentUser) return;
    await new Promise((r) => setTimeout(r, 500));

    const updated = {
      ...currentUser,
      ...profileData
    };

    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    logAudit('Profile Updated', 'User updated account details & preferences', 'Success', updated.name);
    showToast('Profile information successfully saved!', 'success');
    return updated;
  };

  // Change password while logged in
  const changePassword = async (currentPassword, newPassword) => {
    if (!currentUser) throw new Error('Not authenticated.');
    await new Promise((r) => setTimeout(r, 500));

    if (currentUser.password !== currentPassword) {
      logAudit('Failed Password Change', 'Current password verification failed', 'Warning', currentUser.name);
      throw new Error('Your current password does not match our records.');
    }

    const updated = {
      ...currentUser,
      password: newPassword
    };

    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    logAudit('Password Changed', 'User changed security password', 'Success', currentUser.name);
    showToast('Your password has been changed securely!', 'success');
  };

  // Logout with confirmation
  const handleLogout = () => {
    openConfirmModal({
      title: 'Sign Out Confirmation',
      message: 'Are you sure you want to end your current session? You will need to log in again to access the dashboard.',
      confirmText: 'Yes, Sign Out',
      cancelText: 'Stay Logged In',
      type: 'warning',
      onConfirm: () => {
        const userName = currentUser ? currentUser.name : 'User';
        logAudit('User Logout', 'User ended their active session', 'Info', userName);
        setCurrentUser(null);
        showToast('You have been logged out securely.', 'info');
        navigateTo('login');
      }
    });
  };

  // Quick switch demo user for testing ease
  const switchDemoAccount = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      logAudit('Demo Switch', `Switched active demo persona to ${user.name} (${user.role})`, 'Info', user.name);
      showToast(`Switched persona to ${user.name} (${user.role})`, 'info');
      navigateTo('dashboard');
    }
  };

  // User Access Management Table actions
  const addUser = (userData) => {
    const newUser = {
      id: 'usr-' + (users.length + 1) + '-' + Date.now().toString(36).substring(0, 4),
      name: userData.name,
      username: userData.username || userData.email.split('@')[0],
      email: userData.email,
      password: userData.password || 'Temporary@123',
      role: userData.role || 'Team Member',
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
      department: userData.department || 'Operations',
      phone: userData.phone || '+1 (555) 000-0000',
      location: userData.location || 'Remote',
      bio: userData.bio || 'Enterprise access granted.',
      status: userData.status || 'Active',
      twoFactorEnabled: false,
      joinedDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      permissions: userData.permissions || ['users:read'],
      accessLevel: userData.accessLevel || 'Standard'
    };

    setUsers((prev) => [newUser, ...prev]);
    logAudit('User Created', `Administrator provisioned new user: ${newUser.name} (${newUser.role})`);
    showToast(`User ${newUser.name} added successfully!`, 'success');
  };

  const updateUser = (userId, updatedFields) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, ...updatedFields };
          if (currentUser && currentUser.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
    logAudit('User Privileges Updated', `Updated access fields for user ID ${userId}`);
    showToast('User permissions and profile updated.', 'success');
  };

  const deleteUser = (userId) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;

    if (currentUser && currentUser.id === userId) {
      showToast('You cannot delete your own active administrator account!', 'error');
      return;
    }

    openConfirmModal({
      title: `Delete User: ${target.name}?`,
      message: `Are you sure you want to permanently delete ${target.name} (${target.email})? This will immediately revoke all access privileges and destroy active tokens.`,
      confirmText: 'Delete Permanently',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        logAudit('User Deleted', `Permanently deleted user: ${target.name}`, 'Warning');
        showToast(`User ${target.name} has been deleted.`, 'info');
      }
    });
  };

  const toggleUserStatus = (userId) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;

    const newStatus = target.status === 'Active' ? 'Suspended' : 'Active';
    updateUser(userId, { status: newStatus });
    logAudit(
      'Account Status Changed',
      `Changed status of ${target.name} to ${newStatus}`,
      newStatus === 'Active' ? 'Success' : 'Warning'
    );
    showToast(`User status set to ${newStatus}.`, newStatus === 'Active' ? 'success' : 'warning');
  };

  const revokeSession = (userId) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;

    openConfirmModal({
      title: `Revoke Sessions for ${target.name}?`,
      message: `This will forcefully terminate all active browser sessions, OAuth refresh tokens, and API keys for ${target.name}.`,
      confirmText: 'Revoke All Sessions',
      cancelText: 'Cancel',
      type: 'warning',
      onConfirm: () => {
        logAudit('Session Force-Revoked', `Admin terminated all active sessions for ${target.name}`, 'Warning');
        showToast(`Active sessions for ${target.name} have been revoked.`, 'info');
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        currentScreen,
        navigateTo,
        rememberedEmail,
        login,
        register,
        initiateForgotPassword,
        completeResetPassword,
        resetFlowData,
        updateProfile,
        changePassword,
        handleLogout,
        switchDemoAccount,
        addUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
        revokeSession,
        auditLogs,
        confirmationModal,
        closeConfirmModal,
        openConfirmModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
