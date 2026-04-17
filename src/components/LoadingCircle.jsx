import React from 'react';

const LoadingCircle = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="w-20 h-20 border-4 border-red-500 border-dotted rounded-full animate-spin"></div>
      <span className="absolute text-white mt-28">Patientez 25s...</span>
    </div>
  );
};

export default LoadingCircle;
