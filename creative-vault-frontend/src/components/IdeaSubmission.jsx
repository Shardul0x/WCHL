import React, { useState } from 'react';
import { FileText, Upload, Lock, Globe, Clock } from 'lucide-react';

const IdeaSubmission = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Public',
    ipfsHash: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const ideaId = `idea_${Date.now()}`;
      setSuccess(`✅ Idea submitted successfully! ID: ${ideaId}`);
      setFormData({ title: '', description: '', status: 'Public', ipfsHash: '' });
      setLoading(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    }, 1500);
  };

  const statusOptions = [
    { value: 'Public', icon: Globe, label: 'Public', desc: 'Visible immediately to everyone' },
    { value: 'Private', icon: Lock, label: 'Private', desc: 'Only you can see this idea' },
    { value: 'RevealLater', icon: Clock, label: 'Reveal Later', desc: 'Timestamped but hidden until revealed' }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card animate-slide-up">
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 mr-3 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Submit New Idea</h2>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="input-field"
              placeholder="Enter your creative idea title..."
              maxLength="100"
              required
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Make it catchy and descriptive</span>
              <span>{formData.title.length}/100</span>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="8"
              className="input-field resize-none"
              placeholder="Describe your creative idea in detail. Include key concepts, implementation details, or artistic vision..."
              maxLength="2000"
              required
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>The more detail, the better protection</span>
              <span>{formData.description.length}/2000</span>
            </div>
          </div>

          {/* Privacy Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Privacy Setting
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statusOptions.map((option) => (
                <label key={option.value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={formData.status === option.value}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all ${
                    formData.status === option.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center mb-2">
                      <option.icon className={`w-5 h-5 mr-2 ${
                        formData.status === option.value ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-xs text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* IPFS Hash Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              IPFS Hash (Optional)
            </label>
            <input
              type="text"
              value={formData.ipfsHash}
              onChange={(e) => setFormData({...formData, ipfsHash: e.target.value})}
              className="input-field"
              placeholder="QmXxXxX... (for files uploaded to IPFS)"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Upload files to IPFS and paste the hash here for additional verification
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !formData.title || !formData.description}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Timestamping Idea...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  🚀 Submit & Timestamp Idea
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Info Card */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 How It Works</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Your idea gets cryptographically timestamped</li>
            <li>• Immutable proof of creation date is generated</li>
            <li>• Privacy settings control who can see your idea</li>
            <li>• Use proof certificates for legal protection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IdeaSubmission;
