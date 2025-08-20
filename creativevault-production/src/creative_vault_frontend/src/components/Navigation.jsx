import React from 'react';
import { User, LogOut, Plus, Lightbulb, Globe, Shield } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, user, onLogout }) => {
  const tabs = [
    { id: 'submit', label: 'Submit Idea', icon: Plus },
    { id: 'my-ideas', label: 'My Ideas', icon: Lightbulb },
    { id: 'feed', label: 'Public Feed', icon: Globe },
    { id: 'proof', label: 'Generate Proof', icon: Shield }
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Navigation Tabs */}
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-400 bg-opacity-10' 
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">({user.id})</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-yellow-400 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
