import React from 'react';
import { Globe, Lock, Clock, Eye, FileText, Hash, Zap, Shield } from 'lucide-react';

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
      case 'Public': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Private': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'RevealLater': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
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
    <div className="idea-card-enhanced group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {idea.title}
          </h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(idea.status)}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {getStatusText(idea.status)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-400" />
          <Shield className="h-4 w-4 text-cyan-400" />
        </div>
      </div>

      <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
        {idea.description}
      </p>
      
      {/* IPFS Hash section (preserved from original) */}
      {idea.ipfsHash && idea.ipfsHash.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-xs text-slate-400 mb-2">
            <Hash className="h-3 w-3 mr-1" />
            IPFS Hash
          </div>
          <code className="block bg-slate-800/50 text-cyan-400 p-2 rounded text-xs font-mono border border-slate-700">
            {idea.ipfsHash[0]}
          </code>
        </div>
      )}

      {/* Timestamp and Proof Hash sections (preserved from original) */}
      <div className="space-y-3 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Timestamp</span>
          <span className="text-slate-300">{formatDate(idea.timestamp)}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Proof Hash</span>
          <code className="text-cyan-400 font-mono">
            {idea.proofHash.slice(0, 12)}...
          </code>
        </div>
      </div>

      {/* Reveal button (preserved from original functionality) */}
      {showRevealButton && !idea.isRevealed && (
        <button
          onClick={() => onReveal(idea.id)}
          className="btn-primary-gradient w-full mt-4"
        >
          <Eye className="h-4 w-4 mr-2" />
          Reveal Idea
        </button>
      )}
    </div>
  );
};

export default IdeaCard;

