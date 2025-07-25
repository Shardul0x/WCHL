import React, { useState } from 'react';
import { Download, Search, Shield, CheckCircle } from 'lucide-react';

const ProofGenerator = () => {
  const [ideaId, setIdeaId] = useState('');
  const [proofRecord, setProofRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateProof = async () => {
    if (!ideaId.trim()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const mockProof = {
        ideaId: ideaId,
        proofHash: 'sha256:' + Math.random().toString(36).substring(2, 15),
        timestamp: Date.now() - Math.random() * 86400000,
        creator: 'demo123...xyz',
        isVerified: true,
        title: 'Sample Idea',
        status: 'Public',
        blockchainTx: '0x' + Math.random().toString(16).substring(2, 15)
      };
      setProofRecord(mockProof);
      setLoading(false);
    }, 1200);
  };

  const downloadProof = () => {
    if (!proofRecord) return;
    
    const proofData = {
      ...proofRecord,
      generatedAt: new Date().toISOString(),
      platform: "CreativeVault",
      version: "1.0.0"
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
      <div className="card animate-slide-up">
        <div className="flex items-center mb-6">
          <Shield className="w-8 h-8 mr-3 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900">Generate Proof Certificate</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Idea ID
            </label>
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={ideaId}
                  onChange={(e) => setIdeaId(e.target.value)}
                  className="input-field pl-10"
                  placeholder="idea_1701234567890"
                />
              </div>
              <button
                onClick={generateProof}
                disabled={loading || !ideaId.trim()}
                className="btn-primary px-8 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="loading-spinner h-4 w-4 mr-2"></div>
                    Loading...
                  </span>
                ) : (
                  'Generate'
                )}
              </button>
            </div>
          </div>

          {proofRecord && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-green-800 text-lg">✅ Proof Certificate Generated</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Idea ID:</span>
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded border">
                      {proofRecord.ideaId}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Creator:</span>
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded border">
                      {proofRecord.creator}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Timestamp:</span>
                    <p className="text-sm bg-white px-3 py-2 rounded border">
                      {new Date(proofRecord.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Proof Hash:</span>
                    <p className="font-mono text-xs bg-white px-3 py-2 rounded border break-all">
                      {proofRecord.proofHash}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={downloadProof}
                className="w-full btn-primary flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                📥 Download Proof Certificate (JSON)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProofGenerator;
