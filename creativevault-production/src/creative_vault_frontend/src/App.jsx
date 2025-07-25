import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { createActor } from '../../declarations/idea_vault';
import toast from 'react-hot-toast';

// Components
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import IdeaSubmission from './components/IdeaSubmission';
import UserIdeas from './components/UserIdeas';
import PublicFeed from './components/PublicFeed';
import ProofGenerator from './components/ProofGenerator';
import Search from './components/Search';
import Profile from './components/Profile';
import LoadingScreen from './components/LoadingScreen';

// Hooks & Utils
import { useAuthStore } from './store/authStore';
import { useIdeaStore } from './store/ideaStore';

function App() {
  const [loading, setLoading] = useState(true);
  const { 
    isAuthenticated, 
    principal, 
    actor,
    login, 
    logout, 
    initialize 
  } = useAuthStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      await initialize();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      toast.error('Failed to initialize application');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<IdeaSubmission />} />
        <Route path="/ideas" element={<UserIdeas />} />
        <Route path="/feed" element={<PublicFeed />} />
        <Route path="/proof" element={<ProofGenerator />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

const LoginScreen = ({ onLogin }) => {
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async () => {
    setLoggingIn(true);
    try {
      await onLogin();
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-subtle">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="gradient-text">CreativeVault</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Professional IP Protection Platform
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-5 h-5 mr-3 text-green-500">✅</div>
            Blockchain timestamping & proof
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-5 h-5 mr-3 text-green-500">✅</div>
            Legal IP protection certificates
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-5 h-5 mr-3 text-green-500">✅</div>
            Quantum-resistant security
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-5 h-5 mr-3 text-green-500">✅</div>
            Decentralized storage (IPFS)
          </div>
        </div>
        
        <button
          onClick={handleLogin}
          disabled={loggingIn}
          className="w-full btn-primary text-lg py-4 mb-4"
        >
          {loggingIn ? (
            <span className="flex items-center justify-center">
              <div className="loading-spinner h-5 w-5 mr-2"></div>
              Connecting...
            </span>
          ) : (
            'Connect with Internet Identity'
          )}
        </button>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Powered by Internet Computer Protocol
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Your ideas, secured by blockchain technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
