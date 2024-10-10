import React from 'react';

const loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="w-full h-full animate-pulse bg-gray-300"></div>
    </div>
  );
};

export default loading;
