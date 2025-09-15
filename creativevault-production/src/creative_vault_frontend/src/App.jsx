import React, { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';

// Import your existing components using correct relative paths
import Navigation from './components/Navigation';
import IdeaSubmission from './components/IdeaSubmission';
import UserIdeas from './components/UserIdeas';
import PublicFeed from './components/PublicFeed';
import ProofGenerator from './components/ProofGenerator';
import Loginpage from './components/loginpage';
import ProofMintLogo from './pmlogo.png';

function App() {
  const { isAuthenticated, initialize, logout, principal } = useAuthStore();
  const [activeTab, setActiveTab] = useState('submit');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      await initialize();
      setIsInitializing(false);
    };
    init();
  }, [initialize]);

  if (isInitializing) {
    // A simple loading state, since LoadingScreen.jsx doesn't exist
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Initializing...</div>;
  }

  if (!isAuthenticated) {
    return <Loginpage />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <img src={ProofMintLogo} alt="ProofMint Logo" className="header-logo" />
            <span className="header-title">ProofMint</span>
          </div>
        </div>
      </header>

      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={{ name: 'Creator', id: principal ? principal.toString().slice(0, 10) + '...' : '' }} 
        onLogout={logout} 
      />

      <main className="app-main">
        {activeTab === 'submit' && <IdeaSubmission />}
        {activeTab === 'my-ideas' && <UserIdeas />}
        {activeTab === 'feed' && <PublicFeed />}
        {activeTab === 'proof' && <ProofGenerator />}
      </main>
    </div>
  );
}

export default App;