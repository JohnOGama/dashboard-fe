import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader ease-linear rounded-full border-2 border-t-2 border-black h-4 w-4 "></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
