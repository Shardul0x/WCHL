import React, { useState, useEffect } from 'react';
import { Users, Filter } from 'lucide-react';

const PublicFeed = () => {
  const [ideas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading public ideas...</p>
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
      </div>
      
      {ideas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No public ideas yet</h3>
          <p className="text-gray-500 mb-6">Be the first to share your creative idea!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {ideas.map((idea) => (
            <div key={idea.id} className="card">
              <h3 className="font-medium text-gray-900 mb-1">{idea.title}</h3>
              <p className="text-gray-600 text-sm">{idea.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicFeed;
