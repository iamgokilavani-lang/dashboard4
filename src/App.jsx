import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from './components/common/Toast';
import { ConfirmationModal } from './components/common/ConfirmationModal';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Screens
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from './screens/auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from './screens/auth/ResetPasswordScreen';

// Protected Screens
import { DashboardScreen } from './screens/dashboard/DashboardScreen';
import { UserProfileScreen } from './screens/profile/UserProfileScreen';
import { EditProfileScreen } from './screens/profile/EditProfileScreen';
import { ChangePasswordScreen } from './screens/profile/ChangePasswordScreen';

const MainRouter = () => {
  const { currentScreen, currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Screen routing switch
  switch (currentScreen) {
    case 'login':
      return <LoginScreen />;
    case 'register':
      return <RegisterScreen />;
    case 'forgot-password':
      return <ForgotPasswordScreen />;
    case 'reset-password':
      return <ResetPasswordScreen />;

    // Protected screens
    case 'dashboard':
      return (
        <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <DashboardScreen searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </DashboardLayout>
      );
    case 'profile':
      return (
        <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <UserProfileScreen />
        </DashboardLayout>
      );
    case 'edit-profile':
      return (
        <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <EditProfileScreen />
        </DashboardLayout>
      );
    case 'change-password':
      return (
        <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <ChangePasswordScreen />
        </DashboardLayout>
      );

    default:
      return currentUser ? (
        <DashboardLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <DashboardScreen searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </DashboardLayout>
      ) : (
        <LoginScreen />
      );
  }
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <MainRouter />
          <ConfirmationModal />
          <ToastContainer />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
