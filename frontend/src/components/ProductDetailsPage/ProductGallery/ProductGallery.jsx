import React, { useEffect, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
const ProductGallery = ({ productData }) => {
  // console.log(productData);
  const [initialImage, setInitialImage] = useState(productData?.[0]);
  useEffect(() => {
    if (productData && productData.length > 0) {
      setInitialImage(productData[0]);
    }
  }, [productData]);
  return (
    <>
      <div className="flex gap-10">
        <div className="w-32">
          {productData?.map((image, index) => (
            <div key={index} className="h-32 w-32 border border-gray-300 mb-5">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setInitialImage(image)}
              />
            </div>
          ))}
        </div>
        <div className="w-full">
          <InnerImageZoom
            src={initialImage}
            zoomSrc={initialImage}
            // height={500}
            imgAttributes={{ className: "w-[500px] max-h-[500px]" }}
            // className="w-full max-h-[500px]"
          />
          {/* <img src={initialImage} alt="" className="w-full max-h-[500px]" /> */}
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
