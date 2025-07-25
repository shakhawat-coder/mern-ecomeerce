import React from "react";

const BannerSkeleton = () => {
  return (
    <>
      <div className="w-full h-[440px]  animate-pulse">
        <div className="w-full h-[20%] bg-gray-500 animate-pulse"></div>
        <div className="w-1/2 h-[20%] bg-gray-400 animate-pulse mt-6"></div>
        <div className="w-1/3 h-[20%] bg-gray-300 animate-pulse mt-6"></div>
        <div className="w-1/4 h-[20%] bg-gray-200 animate-pulse mt-6"></div>
      </div>
    </>
  );
};

export default BannerSkeleton;
