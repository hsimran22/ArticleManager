import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  if (showSignup) {
    return (
      <SignupPage onSwitchToLogin={() => setShowSignup(false)} />
    );
  }

  return (
    <LoginPage onSwitchToSignup={() => setShowSignup(true)} />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;