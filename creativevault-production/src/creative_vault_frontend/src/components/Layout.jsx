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
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const { principal, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, color: 'text-blue-600' },
    { name: 'Submit Idea', href: '/submit', icon: PlusCircle, color: 'text-green-600' },
    { name: 'My Ideas', href: '/ideas', icon: Lightbulb, color: 'text-yellow-600' },
    { name: 'Public Feed', href: '/feed', icon: Users, color: 'text-purple-600' },
    { name: 'Search', href: '/search', icon: Search, color: 'text-indigo-600' },
    { name: 'Proof Generator', href: '/proof', icon: Shield, color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <Link to="/dashboard" className="flex items-center ml-4 lg:ml-0">
                <div className="text-3xl mr-3 animate-float">🔐</div>
                <h1 className="text-2xl font-bold">
                  <span className="gradient-text">CreativeVault</span>
                </h1>
              </Link>
              
              <div className="hidden md:block ml-4">
                <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full border border-green-200">
                  🔗 Blockchain Connected
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/profile" 
                className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all"
              >
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    Creator
                  </div>
                  <div className="text-xs text-gray-500">
                    {principal?.toString().slice(0, 8)}...
                  </div>
                </div>
              </Link>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Modern Sidebar */}
        <nav className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6 pt-20 lg:pt-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500 shadow-lg'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                    }`}
                  >
                    <item.icon className={`mr-4 h-5 w-5 transition-colors ${isActive ? item.color : 'text-gray-400 group-hover:text-blue-600'}`} />
                    <span className="font-semibold">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Footer */}
            <div className="mt-12 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Pro Tip</h3>
              <p className="text-xs text-blue-600">
                Add detailed descriptions to strengthen your IP protection claims.
              </p>
            </div>
          </div>
        </nav>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
