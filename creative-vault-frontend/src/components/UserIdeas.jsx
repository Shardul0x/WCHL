import React, { useState, useEffect } from 'react';
import { Lightbulb, Eye, Lock, Globe, Clock, Zap } from 'lucide-react';
import IdeaCard from './IdeaCard';

const UserIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user ideas (preserved exact mock data and timing)
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

  // Preserved exact reveal functionality
  const revealIdea = (ideaId) => {
    setIdeas(prevIdeas =>
      prevIdeas.map(idea =>
        idea.id === ideaId
          ? { ...idea, isRevealed: true, status: { Public: null }, revealTimestamp: [Date.now()] }
          : idea
      )
    );
  };

  // Preserved loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative mb-4">
          <Lightbulb className="h-16 w-16 text-cyan-400 animate-pulse" />
          <Zap className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1" />
        </div>
        <p className="text-slate-400 text-lg">Loading your creative ideas...</p>
      </div>
    );
  }

  // Preserved empty state
  if (ideas.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <Lightbulb className="h-20 w-20 text-slate-600 mx-auto" />
          <Zap className="h-7 w-7 text-yellow-400 absolute top-0 right-1/2 transform translate-x-8" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Ideas Yet</h3>
        <p className="text-slate-400 mb-6">Start protecting your creative ideas today!</p>
        <button className="btn-primary-gradient">
          <Lightbulb className="h-5 w-5 mr-2" />
          Submit Your First Idea
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Lightbulb className="h-12 w-12 text-cyan-400" />
            <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Your Ideas</h2>
        <p className="text-slate-400">Manage and protect your creative concepts</p>
      </div>

      {/* Preserved exact grid layout and functionality */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map(idea => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onReveal={revealIdea}
            showRevealButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UserIdeas;
