import React, { useState } from 'react';
import { Shield, User, LogOut, Zap, Lock } from 'lucide-react';
import Navigation from './components/Navigation';
import IdeaSubmission from './components/IdeaSubmission';
import UserIdeas from './components/UserIdeas';
import PublicFeed from './components/PublicFeed';
import ProofGenerator from './components/ProofGenerator';

// Import your logo
import ProofMintLogo from './pmlogo.png'; // Adjust path as needed

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');
  const [user] = useState({ name: 'Demo User', id: 'demo123456789xyz' });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('submit');
  };

  if (!isAuthenticated) {
    return (
      <div className="homepage-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            {/* Logo and Brand */}
            <div className="brand-section">
              <div className="logo-container-homepage">
                <img src={ProofMintLogo} alt="ProofMint Logo" className="homepage-logo" />
              </div>
              <h1 className="brand-title">ProofMint</h1>
              <p className="brand-tagline">Blockchain-Powered Idea Protection</p>
            </div>

            {/* Value Proposition */}
            <div className="value-prop">
              <h2 className="value-title">Secure Your Creative Ideas</h2>
              <p className="value-description">
                Timestamp and protect your intellectual property with immutable blockchain technology
              </p>
            </div>

            {/* Call to Action */}
            <div className="cta-section">
              <button onClick={handleLogin} className="cta-button">
                <Lock className="cta-icon" />
                Connect Wallet
              </button>
              <p className="cta-note">Demo mode - No wallet required</p>
            </div>
          </div>

          {/* Features */}
          <div className="features-grid">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3 className="feature-title">Blockchain Secured</h3>
              <p className="feature-desc">Immutable timestamps on decentralized networks</p>
            </div>
            <div className="feature-card">
              <Zap className="feature-icon" />
              <h3 className="feature-title">AI Enhanced</h3>
              <p className="feature-desc">Intelligent content analysis and protection</p>
            </div>
            <div className="feature-card">
              <Lock className="feature-icon" />
              <h3 className="feature-title">Privacy First</h3>
              <p className="feature-desc">Your ideas remain private until you choose to reveal</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <img src={ProofMintLogo} alt="ProofMint Logo" className="header-logo" />
            <span className="header-title">ProofMint</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />

      {/* Main Content */}
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
