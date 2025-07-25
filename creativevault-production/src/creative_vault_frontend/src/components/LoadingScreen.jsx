import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-4 animate-bounce">🔐</div>
        <h1 className="text-2xl font-bold mb-4">CreativeVault</h1>
        <div className="loading-spinner h-8 w-8 mx-auto"></div>
        <p className="mt-4">Initializing blockchain connection...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
