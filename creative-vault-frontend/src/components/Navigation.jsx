import React from 'react';
import { User, LogOut } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, user, onLogout }) => {
  const tabs = [
    { id: 'submit', label: 'Submit Idea', icon: '🔐' },
    { id: 'my-ideas', label: 'My Ideas', icon: '💡' },
    { id: 'feed', label: 'Public Feed', icon: '👥' },
    { id: 'proof', label: 'Generate Proof', icon: '🧾' }
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="text-blue-600">Creative</span>Vault
              </h1>
              <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                Demo Mode
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-right">
                <User className="w-5 h-5 mr-2 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.id}
                  </div>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-tab whitespace-nowrap ${
                  activeTab === tab.id ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
