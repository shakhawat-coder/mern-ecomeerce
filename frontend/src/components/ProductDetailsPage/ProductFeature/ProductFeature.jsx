import React, { useState } from "react";
import Star from "../../CommonComponents/Star";
import useCalculateDiscount from "../../../hooks/useCalculateDiscount";
import { IoIosHeartEmpty } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
const ProductFeature = ({ productData }) => {
  // console.log(productData);
  const sizes = [
    { id: 1, size: "XS" },
    { id: 2, size: "S" },
    { id: 3, size: "M" },
    { id: 4, size: "L" },
    { id: 5, size: "XL" },
  ];
  const [selectsize, setselectsize] = useState("");

  return (
    <>
      <div className="">
        <span className="text-2xl font-semibold leading-6">
          {productData?.name}
        </span>
        <div className="flex  items-center gap-x-3">
          <Star rating={productData && productData.rating} />

          <h3 className="text-text_black000000 opacity-50 font-medium text-lg font-popins ">{`(${productData?.reviews?.length})`}</h3>
          <span>|</span>
          {productData?.stock > 0 ? (
            <h3 className="text-green-500 opacity-50 font-medium text-lg font-popins ">
              In Stock
            </h3>
          ) : (
            <h3 className="text-red-500 opacity-50 font-medium text-lg font-popins ">
              Out of Stock
            </h3>
          )}
        </div>
        <div className="flex items-center gap-x-3 cursor-pointer">
          <span className="text-2xl text-red-500 font-medium inline-block">
            $
            {useCalculateDiscount(
              productData?.price,
              productData?.discount
            ).toFixed(2)}
          </span>
          <span className="text-lg text-gray-400 line-through">
            {productData ? productData.price.toFixed(2) : "00.00"}
          </span>
        </div>
        <p className=" opacity-75 font-medium text-base font-popins mt-3">
          {productData?.description}
        </p>

        <div className="mt-7">
          <div className="flex items-center gap-x-3">
            <h2 className="text-[20px]  font-normal font-inter text-text_black000000">
              Colours:
            </h2>
            <div className="border-2 border-text_black000000 rounded-full  w-[24px] h-[24px] flex items-center justify-center ">
              <span className="inline-block w-4 h-4 rounded-full bg-[#A0BCE0] "></span>
            </div>
            <div className="border-2 border-text_black000000 rounded-full  w-[24px] h-[24px] flex items-center justify-center ">
              <span className="inline-block w-4 h-4 rounded-full bg-red-500 "></span>
            </div>
          </div>

          {/* size */}
          <div className="flex items-center gap-x-3 mt-[30px]">
            <h2 className="text-[20px]  font-normal font-inter text-black">
              Size:
            </h2>

            <div className="flex items-center gap-x-3 ">
              {sizes.map((item) => (
                <div
                  key={item.id}
                  className={
                    selectsize === item.size
                      ? "border-2 border-x-gray-300 rounded  text-white cursor-pointer w-[36px] h-[36px] bg-red-500 flex items-center justify-center "
                      : "border-2 border-gray-300 rounded  w-[36px] h-[36px] flex cursor-pointer items-center justify-center "
                  }
                  onClick={() => setselectsize(item.size)}
                >
                  <span
                    className="inline-block text-[14px] font-bold  font-popins "
                    key={item.id}
                  >
                    {item.size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* button */}
          <div className="mt-10 flex items-center  gap-x-4">
            <div className="flex items-center">
              <span
                className="px-4 py-2 border-2 border-gray-300 rounded-l-lg text-[20px] font-popins text-black cursor-pointer hover:bg-red-500 hover:text-white"
                // onClick={() => setcount((count += 1))}
              >
                -
              </span>
              <span className="px-6 py-2 border-2 border-gray-300  text-[20px] font-popins text-black border-l-0 cursor-pointer hover:bg-red-500 hover:text-white">
                3
              </span>
              <span
                className="px-4 py-2 border-2 border-gray-300 rounded-r-lg text-[20px] font-popins text-black border-l-0 cursor-pointer hover:bg-red-500 hover:text-white"
                // onclick={() =>
                //   setcount((prev) => {
                //     if (prev > 1) {
                //       count = count - 1;
                //     }
                //     return prev;
                //   })
                // }
              >
                +
              </span>
            </div>
            <button
              className="py-[12px] px-[48px] bg-red-500 rounded-[5px] border-none font-popins font-medium text-white text-[16px]"
              // onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
            {/* {isLoading ? (
              <button className="py-[12px] px-[48px] bg-redDB4444 rounded-[5px] border-none font-popins font-medium text-white_FFFFFF text-[16px]">
                loading ...
              </button>
            ) : (
              
            )} */}

            <div className="border-2 border-x-gray-300 rounded  py-1 px-3 cursor-pointer hover:bg-red-500 hover:text-white ">
              <span className="inline-block text-3xl font-bold  font-popins  w-full h-full ">
                <IoIosHeartEmpty />
              </span>
            </div>
          </div>
          {/* button */}

          {/* condition  */}
          <div className="mt-10">
            <div className="flex items-center gap-x-3 border-b  border-b-gray-300  px-14 py-4">
              <span className="text-4xl">
                <TbTruckDelivery />
              </span>
              <div>
                <h4 className="text-[16px]  font-medium font-popins text-black">
                  Free Delivery
                </h4>
                <p className="text-[12px]  font-medium font-popins text-black">
                  {"Enter your postal code for Delivery Availability"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-3 px-14 py-4">
              <span className="text-4xl">
                <TbTruckDelivery />
              </span>
              <div>
                <h4 className="text-[16px]  font-medium font-popins text-text_black000000">
                  Return Delivery
                </h4>
                <p className="text-[12px]  font-medium font-popins text-black">
                  {"Free 30 Days Delivery Returns. Details"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFeature;
