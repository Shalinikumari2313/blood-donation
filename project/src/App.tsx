import React, { useState } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { DonorDashboard } from './components/Dashboard/DonorDashboard';
import { RecipientDashboard } from './components/Dashboard/RecipientDashboard';
import { BloodBankDashboard } from './components/Dashboard/BloodBankDashboard';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  switch (currentUser.role) {
    case 'donor':
      return <DonorDashboard user={currentUser} onLogout={handleLogout} />;
    case 'recipient':
      return <RecipientDashboard user={currentUser} onLogout={handleLogout} />;
    case 'bloodbank':
      return <BloodBankDashboard user={currentUser} onLogout={handleLogout} />;
    default:
      return <LoginForm onLogin={handleLogin} />;
  }
}

export default App;