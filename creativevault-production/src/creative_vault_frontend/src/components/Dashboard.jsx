import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Lightbulb, 
  Users, 
  Shield, 
  TrendingUp, 
  Star,
  Clock,
  Eye,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useIdeaStore } from '../store/ideaStore';

const Dashboard = () => {
  const { actor } = useAuthStore();
  const { ideas, stats, loadUserIdeas, loadStats } = useIdeaStore();

  useEffect(() => {
    if (actor) {
      loadUserIdeas(actor);
      loadStats(actor);
    }
  }, [actor]);

  const quickActions = [
    {
      name: 'Submit New Idea',
      description: 'Timestamp your creative breakthrough',
      href: '/submit',
      icon: PlusCircle,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      name: 'View My Ideas',
      description: `Manage ${ideas.length} creative assets`,
      href: '/ideas',
      icon: Lightbulb,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
    },
    {
      name: 'Explore Community',
      description: 'Discover public innovations',
      href: '/feed',
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      name: 'Generate Proof',
      description: 'Create legal IP certificates',
      href: '/proof',
      icon: Shield,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
    },
  ];

  const recentIdeas = ideas.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90 rounded-3xl"></div>
          <div className="absolute top-4 right-4 text-6xl opacity-20 animate-float">🚀</div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to <span className="text-yellow-300">CreativeVault</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl">
              Your professional platform for protecting creative ideas with cutting-edge blockchain technology. 
              Secure, timestamp, and legally protect your intellectual property.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/submit" className="btn bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                <Sparkles className="w-5 h-5 mr-2" />
                Submit First Idea
              </Link>
              <Link to="/proof" className="btn bg-blue-500/20 text-white border-2 border-white/30 hover:bg-blue-500/30 backdrop-blur-sm">
                <Shield className="w-5 h-5 mr-2" />
                Generate Proof
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats-card group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white mr-4">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{ideas.length}</h3>
                  <p className="text-gray-600 font-medium">Your Ideas</p>
                </div>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
            <Star className="h-5 w-5 text-yellow-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="stats-card group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
                  <p className="text-gray-600 font-medium">Community</p>
                </div>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="stats-card group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl text-white mr-4">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.totalIdeas}</h3>
                  <p className="text-gray-600 font-medium">Protected</p>
                </div>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <Eye className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full ml-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="group relative overflow-hidden"
            >
              <div className={`card-hover bg-gradient-to-br ${action.bgGradient} border-0 p-6`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 bg-gradient-to-r ${action.gradient} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {action.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  Get started
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Ideas */}
      {recentIdeas.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Ideas</h2>
            <Link to="/ideas" className="text-blue-600 hover:text-blue-700 font-medium flex items-center group">
              View all ideas
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentIdeas.map((idea) => (
              <div key={idea.id} className="card group hover:shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {idea.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {idea.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3 text-xs">
                    <span className={`status-badge ${
                      Object.keys(idea.status)[0] === 'Public' ? 'status-public' : 
                      Object.keys(idea.status)[0] === 'Private' ? 'status-private' : 'status-reveal-later'
                    }`}>
                      {Object.keys(idea.status)[0] === 'Public' ? '🌍' : 
                       Object.keys(idea.status)[0] === 'Private' ? '🔒' : '⏳'} 
                      {Object.keys(idea.status)[0]}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(Number(idea.timestamp) / 1000000).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Highlights */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🔒 Why Choose CreativeVault?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Immutable Proof</h4>
            <p className="text-sm text-gray-600">Blockchain-secured timestamps that can't be altered</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Legal Recognition</h4>
            <p className="text-sm text-gray-600">Court-admissible evidence for IP disputes</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Community</h4>
            <p className="text-sm text-gray-600">Connect with fellow innovators and creators</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Growth</h4>
            <p className="text-sm text-gray-600">Track and manage your creative portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
