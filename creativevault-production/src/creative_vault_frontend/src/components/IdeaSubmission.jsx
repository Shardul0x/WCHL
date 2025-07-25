import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Globe, Lock, Clock, Upload, FileText, Tag, Sparkles, Shield, Info, CheckCircle } from 'lucide-react';
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
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    { 
      value: 'Private', 
      icon: Lock, 
      label: 'Private', 
      description: 'Only visible to you',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50'
    },
    { 
      value: 'RevealLater', 
      icon: Clock, 
      label: 'Reveal Later', 
      description: 'Timestamped but hidden until revealed',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50'
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
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 animate-float">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="hero-title mb-4">Submit Creative Idea</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your innovation into blockchain-protected intellectual property with our secure timestamping platform
        </p>
      </div>

      <div className="card animate-slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  💡 Idea Title *
                </label>
                <input
                  {...register('title', {
                    required: 'Title is required',
                    minLength: { value: 3, message: 'Title must be at least 3 characters' },
                    maxLength: { value: 100, message: 'Title must be less than 100 characters' }
                  })}
                  className={`input-field ${errors.title ? 'input-error' : ''}`}
                  placeholder="Enter a compelling title for your breakthrough idea..."
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-red-600">{errors.title?.message}</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {watchedFields.title?.length || 0}/100
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  🏷️ Category *
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
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  📋 Detailed Description *
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 20, message: 'Description must be at least 20 characters' },
                    maxLength: { value: 5000, message: 'Description must be less than 5000 characters' }
                  })}
                  rows={8}
                  className={`textarea-field ${errors.description ? 'input-error' : ''}`}
                  placeholder="Provide a comprehensive description of your idea. Include key features, benefits, implementation details, target market, and unique value proposition. The more detailed your description, the stronger your IP protection will be."
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-red-600">{errors.description?.message}</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {watchedFields.description?.length || 0}/5000
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  🏷️ Tags (Optional)
                </label>
                
                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full border border-blue-200"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Custom Tag Input */}
                <div className="flex gap-3 mb-4">
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
                    className="btn-secondary px-6"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Add
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
                      className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select up to 10 tags to help categorize and discover your idea
                </p>
              </div>

              {/* Privacy Status */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  🔒 Privacy & Visibility Settings *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {statusOptions.map((option) => (
                    <label key={option.value} className="relative cursor-pointer group">
                      <input
                        {...register('status')}
                        type="radio"
                        value={option.value}
                        className="sr-only"
                      />
                      <div className={`p-6 border-2 rounded-2xl transition-all duration-300 ${
                        watchedFields.status === option.value 
                          ? `border-transparent bg-gradient-to-br ${option.bgGradient} shadow-lg` 
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                      }`}>
                        <div className="flex items-center mb-3">
                          <div className={`p-2 rounded-xl ${
                            watchedFields.status === option.value 
                              ? `bg-gradient-to-r ${option.gradient} text-white shadow-lg` 
                              : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                          }`}>
                            <option.icon className="w-5 h-5" />
                          </div>
                          <span className={`ml-3 font-bold ${
                            watchedFields.status === option.value ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {option.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* IPFS Hash */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Upload className="w-4 h-4 inline mr-2" />
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
                  <span className="text-xs text-red-600 mt-1 block">{errors.ipfsHash.message}</span>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Upload supporting files to IPFS and paste the hash here for additional verification
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full btn-primary py-5 text-lg shadow-xl"
                >
                  {isSubmitting || loading ? (
                    <span className="flex items-center justify-center">
                      <div className="loading-spinner h-6 w-6 mr-3"></div>
                      Securing on Blockchain...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Shield className="w-6 h-6 mr-3" />
                      🚀 Submit & Timestamp Idea
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Protection Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="font-bold text-blue-800">IP Protection</h3>
              </div>
              <div className="space-y-3 text-sm text-blue-700">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>Immutable blockchain timestamp</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>Cryptographic proof generation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>Legal certificate download</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>Court-admissible evidence</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-orange-600 mr-2" />
                <h3 className="font-bold text-orange-800">💡 Pro Tips</h3>
              </div>
              <div className="space-y-2 text-sm text-orange-700">
                <p>• Add detailed descriptions for stronger protection</p>
                <p>• Include technical specifications and diagrams</p>
                <p>• Use relevant tags for better discoverability</p>
                <p>• Consider "Reveal Later" for sensitive ideas</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-3">📊 Platform Stats</h3>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>Ideas Protected:</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Creators:</span>
                  <span className="font-bold">892</span>
                </div>
                <div className="flex justify-between">
                  <span>Certificates Generated:</span>
                  <span className="font-bold">1,891</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaSubmission;
