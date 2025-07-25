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
