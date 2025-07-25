import React from 'react';
import { Globe, Lock, Clock, Eye, FileText, Hash } from 'lucide-react';

const IdeaCard = ({ idea, onReveal, showRevealButton = false }) => {
  const getStatusIcon = (status) => {
    const statusKey = Object.keys(status)[0];
    switch (statusKey) {
      case 'Public': return Globe;
      case 'Private': return Lock;
      case 'RevealLater': return Clock;
      default: return FileText;
    }
  };

  const getStatusColor = (status) => {
    const statusKey = Object.keys(status)[0];
    switch (statusKey) {
      case 'Public': return 'text-green-600 bg-green-50';
      case 'Private': return 'text-red-600 bg-red-50';
      case 'RevealLater': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    return Object.keys(status)[0];
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const StatusIcon = getStatusIcon(idea.status);

  return (
    <div className="card hover:shadow-xl transition-all duration-300 animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{idea.title}</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className={`flex items-center px-3 py-1 rounded-full ${getStatusColor(idea.status)}`}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {getStatusText(idea.status)}
            </div>
            <span className="text-gray-500">
              📅 {formatDate(idea.timestamp)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-mono">
            {idea.id}
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
        {idea.description}
      </p>

      {idea.ipfsHash && idea.ipfsHash.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-1">
            <FileText className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">IPFS File Attached:</span>
          </div>
          <code className="text-xs text-blue-600 break-all block">
            {idea.ipfsHash[0]}
          </code>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Hash className="w-3 h-3 mr-1" />
          <span className="font-medium">Proof:</span>
          <code className="ml-1 bg-gray-100 px-2 py-1 rounded">
            {idea.proofHash.slice(0, 12)}...
          </code>
        </div>
        
        <div className="flex items-center space-x-3">
          {idea.isRevealed && idea.revealTimestamp && (
            <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              Revealed {formatDate(idea.revealTimestamp[0])}
            </span>
          )}
          
          {showRevealButton && !idea.isRevealed && getStatusText(idea.status) === 'RevealLater' && (
            <button
              onClick={() => onReveal(idea.id)}
              className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Eye className="w-4 h-4 mr-1" />
              Reveal Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
