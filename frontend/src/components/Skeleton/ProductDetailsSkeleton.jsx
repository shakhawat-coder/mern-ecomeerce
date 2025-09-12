import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 animate-pulse">
      {/* Left side (images) */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4">
          <div className="w-20 h-20 bg-gray-300 rounded"></div>
          <div className="w-20 h-20 bg-gray-300 rounded"></div>
        </div>
        {/* Main image */}
        <div className="w-80 h-96 bg-gray-300 rounded"></div>
      </div>

      {/* Right side (product info) */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Title */}
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>

        {/* Rating */}
        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>

        {/* Price */}
        <div className="w-1/3 h-8 bg-gray-300 rounded"></div>

        {/* Description */}
        <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>

        {/* Colours */}
        <div className="flex gap-2 mt-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>

        {/* Sizes */}
        <div className="flex gap-2 mt-2">
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-12 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>

        {/* Add to Cart button */}
        <div className="w-40 h-12 bg-gray-300 rounded mt-4"></div>

        {/* Delivery info */}
        <div className="w-1/2 h-4 bg-gray-300 rounded mt-6"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
