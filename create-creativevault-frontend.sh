#!/bin/bash
# create-creativevault-frontend.sh

echo "🚀 Creating CreativeVault Frontend-Only Project..."

# Create project directory
PROJECT_NAME="creative-vault-frontend"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p src/{components,hooks,utils,styles}
mkdir -p public

echo "📝 Creating configuration files..."

# package.json
cat > package.json << 'EOF'
{
  "name": "creative-vault-frontend",
  "version": "1.0.0",
  "description": "CreativeVault UI - Decentralized creative idea timestamping platform",
  "scripts": {
    "start": "vite dev",
    "build": "vite build",
    "dev": "vite",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.0",
    "vite": "^4.4.5"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  }
}
EOF

# vite.config.js
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
EOF

# tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CreativeVault - Protect Your Creative Ideas</title>
    <meta name="description" content="Timestamp and protect your creative ideas with blockchain technology">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔐</text></svg>">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
EOF

echo "⚛️ Creating React components..."

# src/main.jsx
cat > src/main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# src/index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium;
  }
  
  .card {
    @apply bg-white shadow-lg rounded-lg p-6;
  }
  
  .input-field {
    @apply block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  }
  
  .nav-tab {
    @apply py-4 px-6 border-b-2 font-medium text-sm transition-colors cursor-pointer;
  }
  
  .nav-tab-active {
    @apply border-blue-500 text-blue-600;
  }
  
  .nav-tab-inactive {
    @apply border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300;
  }
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
EOF

# src/App.jsx
cat > src/App.jsx << 'EOF'
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
EOF

# src/components/Navigation.jsx
cat > src/components/Navigation.jsx << 'EOF'
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
EOF

# src/components/IdeaSubmission.jsx
cat > src/components/IdeaSubmission.jsx << 'EOF'
import React, { useState } from 'react';
import { FileText, Upload, Lock, Globe, Clock } from 'lucide-react';

const IdeaSubmission = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Public',
    ipfsHash: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const ideaId = `idea_${Date.now()}`;
      setSuccess(`✅ Idea submitted successfully! ID: ${ideaId}`);
      setFormData({ title: '', description: '', status: 'Public', ipfsHash: '' });
      setLoading(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    }, 1500);
  };

  const statusOptions = [
    { value: 'Public', icon: Globe, label: 'Public', desc: 'Visible immediately to everyone' },
    { value: 'Private', icon: Lock, label: 'Private', desc: 'Only you can see this idea' },
    { value: 'RevealLater', icon: Clock, label: 'Reveal Later', desc: 'Timestamped but hidden until revealed' }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card animate-slide-up">
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 mr-3 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Submit New Idea</h2>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="input-field"
              placeholder="Enter your creative idea title..."
              maxLength="100"
              required
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Make it catchy and descriptive</span>
              <span>{formData.title.length}/100</span>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="8"
              className="input-field resize-none"
              placeholder="Describe your creative idea in detail. Include key concepts, implementation details, or artistic vision..."
              maxLength="2000"
              required
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>The more detail, the better protection</span>
              <span>{formData.description.length}/2000</span>
            </div>
          </div>

          {/* Privacy Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Privacy Setting
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statusOptions.map((option) => (
                <label key={option.value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={formData.status === option.value}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all ${
                    formData.status === option.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center mb-2">
                      <option.icon className={`w-5 h-5 mr-2 ${
                        formData.status === option.value ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-xs text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* IPFS Hash Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              IPFS Hash (Optional)
            </label>
            <input
              type="text"
              value={formData.ipfsHash}
              onChange={(e) => setFormData({...formData, ipfsHash: e.target.value})}
              className="input-field"
              placeholder="QmXxXxX... (for files uploaded to IPFS)"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Upload files to IPFS and paste the hash here for additional verification
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !formData.title || !formData.description}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Timestamping Idea...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  🚀 Submit & Timestamp Idea
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Info Card */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 How It Works</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Your idea gets cryptographically timestamped</li>
            <li>• Immutable proof of creation date is generated</li>
            <li>• Privacy settings control who can see your idea</li>
            <li>• Use proof certificates for legal protection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IdeaSubmission;
EOF

# src/components/IdeaCard.jsx
cat > src/components/IdeaCard.jsx << 'EOF'
import React from 'react';
import { Globe, Lock, Clock, Eye, FileText, Hash } from 'lucide-react';

const IdeaCard = ({ idea, onReveal, showRevealButton = false }) => {
  const getStatusIcon = (status) => {
    const statusKey = Object.keys(status)[0];
    switch (statusKey) {
      case 'Public': return Globe;
      case 'Private': return Lock;
      case 'RevealLater': return Clock;
      default: return FileText;
    }
  };

  const getStatusColor = (status) => {
    const statusKey = Object.keys(status)[0];
    switch (statusKey) {
      case 'Public': return 'text-green-600 bg-green-50';
      case 'Private': return 'text-red-600 bg-red-50';
      case 'RevealLater': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    return Object.keys(status)[0];
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const StatusIcon = getStatusIcon(idea.status);

  return (
    <div className="card hover:shadow-xl transition-all duration-300 animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{idea.title}</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className={`flex items-center px-3 py-1 rounded-full ${getStatusColor(idea.status)}`}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {getStatusText(idea.status)}
            </div>
            <span className="text-gray-500">
              📅 {formatDate(idea.timestamp)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-mono">
            {idea.id}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
        {idea.description}
      </p>

      {idea.ipfsHash && idea.ipfsHash.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-1">
            <FileText className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">IPFS File Attached:</span>
          </div>
          <code className="text-xs text-blue-600 break-all block">
            {idea.ipfsHash[0]}
          </code>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Hash className="w-3 h-3 mr-1" />
          <span className="font-medium">Proof:</span>
          <code className="ml-1 bg-gray-100 px-2 py-1 rounded">
            {idea.proofHash.slice(0, 12)}...
          </code>
        </div>
        
        <div className="flex items-center space-x-3">
          {idea.isRevealed && idea.revealTimestamp && (
            <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              Revealed {formatDate(idea.revealTimestamp[0])}
            </span>
          )}
          
          {showRevealButton && !idea.isRevealed && getStatusText(idea.status) === 'RevealLater' && (
            <button
              onClick={() => onReveal(idea.id)}
              className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Eye className="w-4 h-4 mr-1" />
              Reveal Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
EOF

# src/components/UserIdeas.jsx
cat > src/components/UserIdeas.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { Lightbulb, Eye, Lock, Globe, Clock } from 'lucide-react';
import IdeaCard from './IdeaCard';

const UserIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user ideas
    setTimeout(() => {
      const mockIdeas = [
        {
          id: 'idea_1701234567890',
          title: 'AI-Powered Music Composition App',
          description: 'An innovative mobile application that uses artificial intelligence to help musicians compose melodies by analyzing their humming patterns and converting them into musical notation.',
          timestamp: Date.now() - 86400000, // 1 day ago
          status: { Public: null },
          isRevealed: true,
          revealTimestamp: [Date.now() - 86400000],
          proofHash: 'abc123def456',
          ipfsHash: ['QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX']
        },
        {
          id: 'idea_1701234567891',
          title: 'Sustainable Urban Farming System',
          description: 'A vertical hydroponic farming system designed for urban apartments, featuring automated nutrient delivery and LED grow lights optimized for small spaces.',
          timestamp: Date.now() - 172800000, // 2 days ago
          status: { RevealLater: null },
          isRevealed: false,
          revealTimestamp: null,
          proofHash: 'def456ghi789',
          ipfsHash: []
        },
        {
          id: 'idea_1701234567892',
          title: 'Blockchain-Based Art Authentication',
          description: 'A platform that uses blockchain technology to create tamper-proof certificates of authenticity for digital and physical artwork, solving the problem of art forgery.',
          timestamp: Date.now() - 259200000, // 3 days ago
          status: { Private: null },
          isRevealed: false,
          revealTimestamp: null,
          proofHash: 'ghi789jkl012',
          ipfsHash: []
        }
      ];
      setIdeas(mockIdeas);
      setLoading(false);
    }, 1000);
  }, []);

  const revealIdea = (ideaId) => {
    setIdeas(prevIdeas => 
      prevIdeas.map(idea => 
        idea.id === ideaId 
          ? { 
              ...idea, 
              isRevealed: true, 
              status: { Public: null },
              revealTimestamp: [Date.now()] 
            }
          : idea
      )
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading your creative ideas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900">
            Your Ideas ({ideas.length})
          </h2>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1 text-green-500" />
            <span>{ideas.filter(i => i.isRevealed).length} Public</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-yellow-500" />
            <span>{ideas.filter(i => !i.isRevealed && Object.keys(i.status)[0] === 'RevealLater').length} Hidden</span>
          </div>
          <div className="flex items-center">
            <Lock className="w-4 h-4 mr-1 text-red-500" />
            <span>{ideas.filter(i => Object.keys(i.status)[0] === 'Private').length} Private</span>
          </div>
        </div>
      </div>
      
      {ideas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas submitted yet</h3>
          <p className="text-gray-500 mb-6">Start protecting your creative ideas today!</p>
          <button className="btn-primary">
            Submit Your First Idea
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {ideas.map((idea) => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              onReveal={revealIdea}
              showRevealButton={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserIdeas;
EOF

# src/components/PublicFeed.jsx
cat > src/components/PublicFeed.jsx << 'EOF'
import React, { useState, useEffect } from 'react';
import { Users, Filter } from 'lucide-react';
import IdeaCard from './IdeaCard';

const PublicFeed = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    // Simulate loading public ideas
    setTimeout(() => {
      const mockPublicIdeas = [
        {
          id: 'idea_pub_001',
          title: 'Decentralized Social Media Platform',
          description: 'A blockchain-based social media platform where users own their data and content creators are directly rewarded by their audience without intermediary platforms taking large cuts.',
          timestamp: Date.now() - 3600000, // 1 hour ago
          status: { Public: null },
          isRevealed: true,
          revealTimestamp: [Date.now() - 3600000],
          proofHash: 'pub001hash123',
          ipfsHash: [],
          creator: 'alice123...xyz'
        },
        {
          id: 'idea_pub_002',
          title: 'Smart Contract for Freelance Payments',
          description: 'An automated escrow system using smart contracts that releases payments to freelancers based on milestone completion, reducing disputes and ensuring fair compensation.',
          timestamp: Date.now() - 7200000, // 2 hours ago
          status: { Public: null },
          isRevealed: true,
          revealTimestamp: [Date.now() - 7200000],
          proofHash: 'pub002hash456',
          ipfsHash: ['QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyY'],
          creator: 'bob456...abc'
        },
        {
          id: 'idea_pub_003',
          title: 'AI-Powered Carbon Footprint Tracker',
          description: 'A mobile app that uses AI to analyze purchase receipts and lifestyle choices to calculate and suggest ways to reduce personal carbon footprint with gamification elements.',
          timestamp: Date.now() - 10800000, // 3 hours ago
          status: { Public: null },
          isRevealed: true,
          revealTimestamp: [Date.now() - 10800000],
          proofHash: 'pub003hash789',
          ipfsHash: [],
          creator: 'charlie789...def'
        },
        {
          id: 'idea_pub_004',
          title: 'Virtual Reality Meditation Experience',
          description: 'An immersive VR application that creates personalized meditation environments based on user preferences, stress levels, and biometric data for enhanced mindfulness practice.',
          timestamp: Date.now() - 14400000, // 4 hours ago
          status: { Public: null },
          isRevealed: true,
          revealTimestamp: [Date.now() - 14400000],
          proofHash: 'pub004hash012',
          ipfsHash: [],
          creator: 'diana012...ghi'
        },
        {
          id: 'idea_pub_005',
          title: 'Peer-to-Peer Learning Marketplace',
          description: 'A platform where anyone can teach or learn skills directly from peers, with blockchain-based credentials and reputation systems ensuring quality and trust.',
          timestamp: Date.now() - 18000000, // 5 hours ago
          status: { Public: null },
          isRevealed: true,
          revealTimestamp: [Date.now() - 18000000],
          proofHash: 'pub005hash345',
          ipfsHash: [],
          creator: 'eve345...jkl'
        }
      ];
      setIdeas(mockPublicIdeas.slice(0, limit));
      setLoading(false);
    }, 800);
  }, [limit]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Discovering creative ideas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Users className="w-8 h-8 mr-3 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Public Feed ({ideas.length})
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-400" />
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>Show 10</option>
              <option value={20}>Show 20</option>
              <option value={50}>Show 50</option>
            </select>
          </div>
        </div>
      </div>
      
      {ideas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No public ideas yet</h3>
          <p className="text-gray-500 mb-6">Be the first to share your creative idea with the community!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {ideas.map((idea) => (
            <div key={idea.id} className="relative">
              <IdeaCard idea={idea} />
              <div className="absolute top-4 right-4 text-xs text-gray-400">
                by {idea.creator}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🌟 Community Guidelines</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Share original ideas and respect intellectual property</li>
          <li>• Public ideas are visible to everyone and timestamped</li>
          <li>• Use "Reveal Later" for ideas you want to timestamp privately first</li>
          <li>• Detailed descriptions provide better legal protection</li>
        </ul>
      </div>
    </div>
  );
};

export default PublicFeed;
EOF

# src/components/ProofGenerator.jsx
cat > src/components/ProofGenerator.jsx << 'EOF'
import React, { useState } from 'react';
import { Download, Search, Shield, CheckCircle } from 'lucide-react';

const ProofGenerator = () => {
  const [ideaId, setIdeaId] = useState('');
  const [proofRecord, setProofRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateProof = async () => {
    if (!ideaId.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockProof = {
        ideaId: ideaId,
        proofHash: 'sha256:' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        timestamp: Date.now() - Math.random() * 86400000,
        creator: 'demo123...xyz',
        isVerified: true,
        title: 'AI-Powered Music Composition App',
        status: 'Public',
        blockchainTx: '0x' + Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15)
      };
      setProofRecord(mockProof);
      setLoading(false);
    }, 1200);
  };

  const downloadProof = () => {
    if (!proofRecord) return;
    
    const proofData = {
      ...proofRecord,
      generatedAt: new Date().toISOString(),
      platform: "CreativeVault",
      version: "1.0.0",
      certificate: {
        type: "Idea Ownership Certificate",
        description: "This certificate proves ownership and timestamp of the creative idea",
        legalNotice: "This document can be used as evidence in intellectual property disputes"
      }
    };
    
    const blob = new Blob([JSON.stringify(proofData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creativevault-proof-${proofRecord.ideaId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card animate-slide-up">
        <div className="flex items-center mb-6">
          <Shield className="w-8 h-8 mr-3 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900">Generate Proof Certificate</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Idea ID
            </label>
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={ideaId}
                  onChange={(e) => setIdeaId(e.target.value)}
                  className="input-field pl-10"
                  placeholder="idea_1701234567890"
                />
              </div>
              <button
                onClick={generateProof}
                disabled={loading || !ideaId.trim()}
                className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </span>
                ) : (
                  'Generate'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter the ID of an idea you want to generate a proof certificate for
            </p>
          </div>

          {proofRecord && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-green-800 text-lg">✅ Proof Certificate Generated</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Idea ID:</span>
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded border">
                      {proofRecord.ideaId}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Creator:</span>
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded border">
                      {proofRecord.creator}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <p className="text-sm bg-white px-3 py-2 rounded border">
                      <span className="text-green-600">✅ {proofRecord.isVerified ? 'Verified' : 'Unverified'}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Timestamp:</span>
                    <p className="text-sm bg-white px-3 py-2 rounded border">
                      {new Date(proofRecord.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Blockchain TX:</span>
                    <p className="font-mono text-xs bg-white px-3 py-2 rounded border break-all">
                      {proofRecord.blockchainTx}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Proof Hash:</span>
                    <p className="font-mono text-xs bg-white px-3 py-2 rounded border break-all">
                      {proofRecord.proofHash}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={downloadProof}
                className="w-full btn-primary flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                📥 Download Proof Certificate (JSON)
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">💡 How to Use Proof Certificates</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Download and store securely for your records</li>
              <li>• Use in legal proceedings as evidence</li>
              <li>• Share with collaborators or investors</li>
              <li>• Verify authenticity using the proof hash</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">🔐 Legal Protection</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Cryptographically signed timestamps</li>
              <li>• Immutable blockchain records</li>
              <li>• Acceptable in most jurisdictions</li>
              <li>• Strengthens IP ownership claims</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofGenerator;
EOF

# .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Vite
.vite/
EOF

# README.md
cat > README.md << 'EOF'
# CreativeVault - Frontend Demo

![CreativeVault](https://img.shields.io/badge/Platform-React-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Demo-yellow)

A beautiful, responsive frontend for CreativeVault - a decentralized creative idea timestamping platform.

## 🚀 Features

- 🔐 **Idea Submission**: Submit and timestamp creative ideas
- 💡 **My Ideas Dashboard**: Manage your personal idea collection  
- 👥 **Public Feed**: Explore community shared ideas
- 🧾 **Proof Generator**: Generate verifiable certificates
- 🎨 **Modern UI**: Built with React and Tailwind CSS
- 📱 **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **JavaScript**: ES6+ features

## 🚀 Quick Start

