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
