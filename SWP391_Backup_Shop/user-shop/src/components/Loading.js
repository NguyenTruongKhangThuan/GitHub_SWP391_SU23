import React from 'react';

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-4 duration-1000"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
        {/* Additional content for the loading modal */}
      </div>
    </div>
  );
};

export default LoadingModal;