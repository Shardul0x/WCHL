import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Lightbulb, Users, Shield, TrendingUp } from 'lucide-react';
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
      description: 'Timestamp your creative idea',
      href: '/submit',
      icon: PlusCircle,
      color: 'bg-blue-500',
    },
    {
      name: 'View My Ideas',
      description: `Manage ${ideas.length} ideas`,
      href: '/ideas',
      icon: Lightbulb,
      color: 'bg-yellow-500',
    },
    {
      name: 'Explore Community',
      description: 'Discover public innovations',
      href: '/feed',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Generate Proof',
      description: 'Create IP certificates',
      href: '/proof',
      icon: Shield,
      color: 'bg-purple-500',
    },
  ];

  const recentIdeas = ideas.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-soft p-6 border">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to CreativeVault
        </h1>
        <p className="text-gray-600">
          Your professional platform for protecting creative ideas with blockchain technology.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-soft border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{ideas.length}</h3>
              <p className="text-gray-600">Your Ideas</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{stats.totalUsers}</h3>
              <p className="text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{stats.totalIdeas}</h3>
              <p className="text-gray-600">Platform Ideas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="card-hover group"
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 ${action.color} rounded-lg`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                {action.name}
              </h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Ideas */}
      {recentIdeas.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Ideas</h2>
            <Link to="/ideas" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentIdeas.map((idea) => (
              <div key={idea.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{idea.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{idea.description}</p>
                    <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                      <span>
                        {Object.keys(idea.status)[0] === 'Public' ? '🌍' : 
                         Object.keys(idea.status)[0] === 'Private' ? '🔒' : '⏳'} 
                        {Object.keys(idea.status)[0]}
                      </span>
                      <span>📅 {new Date(Number(idea.timestamp) / 1000000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
