import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  Lightbulb, 
  Users, 
  Search, 
  User, 
  Shield,
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Layout = ({ children }) => {
  const location = useLocation();
  const { principal, logout } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Submit Idea', href: '/submit', icon: PlusCircle },
    { name: 'My Ideas', href: '/ideas', icon: Lightbulb },
    { name: 'Public Feed', href: '/feed', icon: Users },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Proof Generator', href: '/proof', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <span className="text-2xl mr-2">🔐</span>
                <h1 className="text-xl font-bold">
                  <span className="gradient-text">CreativeVault</span>
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <User className="h-5 w-5" />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">
                    {principal?.toString().slice(0, 8)}...
                  </div>
                </div>
              </Link>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen border-r">
          <div className="p-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'nav-link-active'
                        : 'nav-link'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
