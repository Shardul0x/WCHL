import React, { useState } from 'react';
import { FileText, Upload, Lock, Globe, Clock, Zap, Shield, CheckCircle, Info } from 'lucide-react';

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
    setTimeout(() => {
      const ideaId = `idea_${Date.now()}`;
      setSuccess(`Idea submitted successfully! ID: ${ideaId}`);
      setFormData({ title: '', description: '', status: 'Public', ipfsHash: '' });
      setLoading(false);
      setTimeout(() => setSuccess(''), 5000);
    }, 1500);
  };

  const statusOptions = [
    { 
      value: 'Public', 
      icon: Globe, 
      label: 'Public', 
      desc: 'Visible to everyone immediately',
      badge: 'Open Source'
    },
    { 
      value: 'Private', 
      icon: Lock, 
      label: 'Private', 
      desc: 'Only visible to you',
      badge: 'Confidential'
    },
    { 
      value: 'RevealLater', 
      icon: Clock, 
      label: 'Reveal Later', 
      desc: 'Timestamped but hidden until revealed',
      badge: 'Scheduled'
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-badge">
          <Shield className="hero-badge-icon" />
          <span>Blockchain Protected</span>
        </div>
        <h1 className="hero-title">Submit New Idea</h1>
        <p className="hero-subtitle">
          Secure your intellectual property with immutable blockchain timestamps and cryptographic proof
        </p>
      </div>

      {/* Success Alert */}
      {success && (
        <div className="success-banner">
          <CheckCircle className="success-icon" />
          <div className="success-content">
            <div className="success-title">Success!</div>
            <div className="success-message">{success}</div>
          </div>
        </div>
      )}

      <div className="content-grid">
        {/* Main Form */}
        <div className="form-panel">
          <form onSubmit={handleSubmit} className="idea-form">
            {/* Title Section */}
            <div className="form-group">
              <div className="label-row">
                <label className="field-label">Idea Title</label>
                <span className="required-badge">Required</span>
              </div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="text-input"
                placeholder="Enter your creative idea title..."
                required
              />
              <p className="field-hint">Make it descriptive and memorable</p>
            </div>

            {/* Description Section */}
            <div className="form-group">
              <div className="label-row">
                <label className="field-label">Detailed Description</label>
                <span className="required-badge">Required</span>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="8"
                className="text-area"
                placeholder="Describe your creative idea in detail. Include key concepts, implementation details, unique features, or artistic vision..."
                required
              />
              <p className="field-hint">The more detail you provide, the stronger your protection will be</p>
            </div>

            {/* Privacy Settings */}
            <div className="form-group">
              <label className="field-label">Privacy Setting</label>
              <div className="privacy-cards">
                {statusOptions.map(option => {
                  const Icon = option.icon;
                  const isSelected = formData.status === option.value;
                  return (
                    <label key={option.value} className="privacy-card-wrapper">
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={isSelected}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="privacy-input"
                      />
                      <div className={`privacy-card ${isSelected ? 'selected' : ''}`}>
                        <div className="privacy-header">
                          <Icon className="privacy-icon" />
                          <span className="privacy-badge">{option.badge}</span>
                        </div>
                        <div className="privacy-title">{option.label}</div>
                        <div className="privacy-description">{option.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* IPFS Section */}
            <div className="form-group">
              <div className="label-row">
                <label className="field-label">IPFS Hash</label>
                <span className="optional-badge">Optional</span>
              </div>
              <input
                type="text"
                value={formData.ipfsHash}
                onChange={(e) => setFormData({...formData, ipfsHash: e.target.value})}
                className="text-input mono-font"
                placeholder="QmXxXxXx... (for files uploaded to IPFS)"
              />
              <p className="field-hint">
                Upload files to IPFS and paste the hash here for additional verification
              </p>
            </div>

            {/* Submit Section */}
            <div className="submit-section">
              <button
                type="submit"
                disabled={loading || !formData.title || !formData.description}
                className="submit-btn"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Securing Your Idea...</span>
                  </>
                ) : (
                  <>
                    <Shield className="submit-icon" />
                    <span>Submit & Timestamp Idea</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="info-sidebar">
          <div className="info-card">
            <div className="info-header">
              <Info className="info-icon" />
              <h3 className="info-title">How It Works</h3>
            </div>
            
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4 className="step-title">Cryptographic Hash</h4>
                  <p className="step-desc">Your idea is converted into a unique cryptographic fingerprint</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4 className="step-title">Blockchain Timestamp</h4>
                  <p className="step-desc">The hash is timestamped on an immutable blockchain network</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4 className="step-title">Proof Generation</h4>
                  <p className="step-desc">A verifiable certificate of ownership and creation date is created</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4 className="step-title">Legal Protection</h4>
                  <p className="step-desc">Use your proof certificate for patent applications and legal disputes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="security-features">
            <h4 className="features-title">Security Features</h4>
            <div className="feature-list">
              <div className="feature-item">
                <Shield className="feature-icon" />
                <span>256-bit encryption</span>
              </div>
              <div className="feature-item">
                <Lock className="feature-icon" />
                <span>Immutable timestamps</span>
              </div>
              <div className="feature-item">
                <Zap className="feature-icon" />
                <span>Instant verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaSubmission;
