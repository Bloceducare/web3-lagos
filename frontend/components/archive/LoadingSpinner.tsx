import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center h-64 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
