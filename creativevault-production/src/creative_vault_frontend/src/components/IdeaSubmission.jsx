import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Globe, Lock, Clock, Upload, FileText, Tag } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useIdeaStore } from '../store/ideaStore';
import toast from 'react-hot-toast';

const IdeaSubmission = () => {
  const { actor } = useAuthStore();
  const { submitIdea, loading } = useIdeaStore();
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'Public',
      category: 'Technology',
      ipfsHash: ''
    }
  });

  const watchedFields = watch();

  const categories = [
    'Technology', 'Art & Design', 'Business', 'Healthcare', 
    'Education', 'Environment', 'Entertainment', 'Science', 'Other'
  ];

  const suggestedTags = [
    'AI', 'Blockchain', 'Mobile App', 'Web Development', 'IoT',
    'Machine Learning', 'UI/UX', 'API', 'Security', 'Cloud',
    'Innovation', 'Sustainability', 'Automation', 'Analytics'
  ];

  const statusOptions = [
    { 
      value: 'Public', 
      icon: Globe, 
      label: 'Public', 
      description: 'Visible to everyone immediately',
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    { 
      value: 'Private', 
      icon: Lock, 
      label: 'Private', 
      description: 'Only visible to you',
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    { 
      value: 'RevealLater', 
      icon: Clock, 
      label: 'Reveal Later', 
      description: 'Timestamped but hidden until revealed',
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  ];

  const addTag = (tag) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 10) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim()) {
      addTag(customTag.trim());
      setCustomTag('');
    }
  };

  const onSubmit = async (data) => {
    try {
      const ideaData = {
        title: data.title.trim(),
        description: data.description.trim(),
        status: { [data.status]: null },
        ipfsHash: data.ipfsHash ? [data.ipfsHash.trim()] : [],
        tags: selectedTags,
        category: data.category
      };

      await submitIdea(actor, ideaData);
      reset();
      setSelectedTags([]);
    } catch (error) {
      // Error handling is done in the store
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card animate-fade-in">
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 mr-3 text-primary-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Submit Creative Idea</h1>
            <p className="text-gray-600 mt-1">Timestamp and protect your innovation on the blockchain</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Idea Title *
            </label>
            <input
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' },
                maxLength: { value: 100, message: 'Title must be less than 100 characters' }
              })}
              className={`input-field ${errors.title ? 'input-error' : ''}`}
              placeholder="Enter a compelling title for your creative idea..."
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-red-600">{errors.title?.message}</span>
              <span className="text-xs text-gray-500">
                {watchedFields.title?.length || 0}/100
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="select-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 20, message: 'Description must be at least 20 characters' },
                maxLength: { value: 5000, message: 'Description must be less than 5000 characters' }
              })}
              rows={8}
              className={`textarea-field ${errors.description ? 'input-error' : ''}`}
              placeholder="Provide a comprehensive description of your idea. Include key features, benefits, implementation details, and any unique aspects. The more detailed your description, the stronger your IP protection."
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-red-600">{errors.description?.message}</span>
              <span className="text-xs text-gray-500">
                {watchedFields.description?.length || 0}/5000
              </span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (Optional)
            </label>
            
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 text-sm bg-primary-100 text-primary-800 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Custom Tag Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag())}
                className="input-field flex-1"
                placeholder="Add custom tag..."
                maxLength={20}
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                disabled={!customTag.trim() || selectedTags.length >= 10}
                className="btn-secondary"
              >
                <Tag className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested Tags */}
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  disabled={selectedTags.includes(tag) || selectedTags.length >= 10}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select up to 10 tags to help categorize your idea
            </p>
          </div>

          {/* Privacy Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Privacy & Visibility Settings *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statusOptions.map((option) => (
                <label key={option.value} className="relative cursor-pointer">
                  <input
                    {...register('status')}
                    type="radio"
                    value={option.value}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-xl transition-all ${
                    watchedFields.status === option.value 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center mb-2">
                      <option.icon className={`w-5 h-5 mr-2 ${
                        watchedFields.status === option.value ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* IPFS Hash */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              IPFS File Hash (Optional)
            </label>
            <input
              {...register('ipfsHash', {
                pattern: {
                  value: /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/,
                  message: 'Invalid IPFS hash format'
                }
              })}
              className="input-field"
              placeholder="QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX..."
            />
            {errors.ipfsHash && (
              <span className="text-xs text-red-600">{errors.ipfsHash.message}</span>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Upload files to IPFS and paste the hash here for additional verification
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full btn-primary py-4 text-lg"
            >
              {isSubmitting || loading ? (
                <span className="flex items-center justify-center">
                  <div className="loading-spinner h-5 w-5 mr-2"></div>
                  Submitting to Blockchain...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  🚀 Submit & Timestamp Idea
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-semibold text-blue-800 mb-3">🔒 How Your Idea is Protected</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-1">🕐 Immutable Timestamping</h4>
              <p>Your idea receives a permanent, tamper-proof timestamp on the Internet Computer blockchain</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">🔐 Cryptographic Proof</h4>
              <p>Generate legally-valid certificates with cryptographic signatures for IP protection</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">🌐 Decentralized Storage</h4>
              <p>Your data is stored across multiple nodes, ensuring permanent availability</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">⚖️ Legal Recognition</h4>
              <p>Blockchain timestamps are increasingly recognized in intellectual property law</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaSubmission;
