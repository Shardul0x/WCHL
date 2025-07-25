import React, { useState } from 'react';
import { Shield, User, LogOut } from 'lucide-react';
import Navigation from './components/Navigation';
import IdeaSubmission from './components/IdeaSubmission';
import UserIdeas from './components/UserIdeas';
import PublicFeed from './components/PublicFeed';
import ProofGenerator from './components/ProofGenerator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');
  const [user] = useState({
    name: 'Demo User',
    id: 'demo123...xyz'
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('submit');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CreativeVault</h1>
            <p className="text-gray-600 text-lg">
              Timestamp and protect your creative ideas
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-sm text-gray-700">
              <Shield className="w-5 h-5 mr-3 text-green-500" />
              Immutable timestamping
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Shield className="w-5 h-5 mr-3 text-green-500" />
              Privacy controls
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Shield className="w-5 h-5 mr-3 text-green-500" />
              Verifiable proof generation
            </div>
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full btn-primary text-lg py-4"
          >
            Connect Wallet (Demo)
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            * This is a demo version - no actual blockchain connection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          {activeTab === 'submit' && <IdeaSubmission />}
          {activeTab === 'my-ideas' && <UserIdeas />}
          {activeTab === 'feed' && <PublicFeed />}
          {activeTab === 'proof' && <ProofGenerator />}
        </div>
      </main>
    </div>
  );
}

export default App;
