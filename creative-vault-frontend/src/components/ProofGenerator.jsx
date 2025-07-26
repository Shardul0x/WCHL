import React, { useState } from 'react';
import { Download, Search, Shield, CheckCircle, FileText, Hash, Zap } from 'lucide-react';

const ProofGenerator = () => {
  const [ideaId, setIdeaId] = useState('');
  const [proofRecord, setProofRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  // Preserved exact generateProof functionality
  const generateProof = async () => {
    if (!ideaId.trim()) return;
    
    setLoading(true);
    // Simulate API call (preserved exact timing and logic)
    setTimeout(() => {
      const mockProof = {
        ideaId: ideaId,
        proofHash: 'sha256:' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        timestamp: Date.now() - Math.random() * 86400000,
        creator: 'demo123...xyz',
        isVerified: true,
        title: 'AI-Powered Music Composition App',
        status: 'Public',
        blockchainTx: '0x' + Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15)
      };
      setProofRecord(mockProof);
      setLoading(false);
    }, 1200);
  };

  // Preserved exact downloadProof functionality
  const downloadProof = () => {
    if (!proofRecord) return;
    
    const proofData = {
      ...proofRecord,
      generatedAt: new Date().toISOString(),
      platform: "CreativeVault",
      version: "1.0.0",
      certificate: {
        type: "Idea Ownership Certificate",
        description: "This certificate proves ownership and timestamp of the creative idea",
        legalNotice: "This document can be used as evidence in intellectual property disputes"
      }
    };
    
    const blob = new Blob([JSON.stringify(proofData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creativevault-proof-${proofRecord.ideaId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <FileText className="h-12 w-12 text-cyan-400" />
            <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Generate Proof Certificate</h2>
        <p className="text-slate-400">Create verifiable proof of your idea ownership</p>
      </div>

      {/* Preserved exact input and generate section */}
      <div className="glass-card mb-8">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Idea ID
        </label>
        <p className="text-xs text-slate-400 mb-4">
          Enter the ID of an idea you want to generate a proof certificate for
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={ideaId}
            onChange={(e) => setIdeaId(e.target.value)}
            placeholder="idea_1701234567890"
            className="input-field-enhanced flex-1 font-mono"
          />
          <button
            onClick={generateProof}
            disabled={loading || !ideaId.trim()}
            className="btn-primary-gradient px-6"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="spinner mr-2"></div>
                Generating...
              </div>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Generate Proof
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preserved exact proof record display */}
      {proofRecord && (
        <div className="glass-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Proof Certificate</h3>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Verified</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Idea ID</label>
                <code className="text-cyan-400 font-mono text-sm">{proofRecord.ideaId}</code>
              </div>
              
              <div>
                <label className="text-xs text-slate-400 block mb-1">Creator</label>
                <code className="text-slate-300 font-mono text-sm">{proofRecord.creator}</code>
              </div>
              
              <div>
                <label className="text-xs text-slate-400 block mb-1">Status</label>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm">✅ {proofRecord.isVerified ? 'Verified' : 'Unverified'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Timestamp</label>
                <span className="text-slate-300 text-sm">{new Date(proofRecord.timestamp).toLocaleString()}</span>
              </div>
              
              <div>
                <label className="text-xs text-slate-400 block mb-1">Blockchain Transaction</label>
                <code className="text-cyan-400 font-mono text-sm">{proofRecord.blockchainTx}</code>
              </div>
              
              <div>
                <label className="text-xs text-slate-400 block mb-1">Proof Hash</label>
                <code className="text-cyan-400 font-mono text-sm break-all">{proofRecord.proofHash}</code>
              </div>
            </div>
          </div>

          {/* Preserved exact download functionality */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <button
              onClick={downloadProof}
              className="btn-primary-gradient w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate (JSON)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProofGenerator;
