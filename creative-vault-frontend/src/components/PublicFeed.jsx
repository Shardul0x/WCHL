import React, { useState, useEffect } from 'react';
import { Users, Filter, Globe, Zap } from 'lucide-react';
import IdeaCard from './IdeaCard';

const PublicFeed = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    // Simulate loading public ideas (preserved exact mock data and timing)
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

  // Preserved loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative mb-4">
          <Globe className="h-16 w-16 text-cyan-400 animate-pulse" />
          <Zap className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1" />
        </div>
        <p className="text-slate-400 text-lg">Discovering creative ideas...</p>
      </div>
    );
  }

  // Preserved empty state
  if (ideas.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <Globe className="h-20 w-20 text-slate-600 mx-auto" />
          <Zap className="h-7 w-7 text-yellow-400 absolute top-0 right-1/2 transform translate-x-8" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Public Ideas Yet</h3>
        <p className="text-slate-400 mb-6">Be the first to share your creative idea with the community!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Globe className="h-12 w-12 text-cyan-400" />
            <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Public Feed</h2>
        <p className="text-slate-400">Discover creative ideas from the community</p>
      </div>

      {/* Preserved filter section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-slate-400">
          <Users className="h-5 w-5 mr-2" />
          <span>{ideas.length} public ideas</span>
        </div>
        <button className="btn-secondary-ghost">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Preserved exact grid layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map(idea => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default PublicFeed;
