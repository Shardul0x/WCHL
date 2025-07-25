import React, { useState, useEffect } from 'react';
import { Lightbulb, Eye, Lock, Globe, Clock } from 'lucide-react';

const UserIdeas = () => {
  const [ideas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your ideas...</p>
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
      </div>
      
      {ideas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas submitted yet</h3>
          <p className="text-gray-500 mb-6">Start protecting your creative ideas today!</p>
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

export default UserIdeas;
