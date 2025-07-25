import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Heading from "./Heading";
import Slider from "react-slick";
import ProductSkeleton from "../Skeleton/ProductSkeleton";
import CountDown from "./CountDown";

const ProductCommonLayout = ({
  ProductCard = () => <ProductSkeleton />,
  timeStamp,
  timeofOffer,
  isArrowsTrue,
  heading,
  description,
  partialItmemsShow,
  componentData = [],
  isLoading,
  rows = 1,
}) => {
  // console.log(componentData);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    loop: false,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    rows: rows,
  };
  return (
    <>
      <div className="mt-[140px] mb-[0px]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-[87px]">
              <Heading heading={heading} description={description} />
              {timeStamp && (
                <CountDown
                  targetDate={timeStamp}
                  size="small"
                  minimal="gradient"
                  // onComplete={() => handleCountdownComplete("New Year")}
                />
              )}
            </div>
            {isArrowsTrue && (
              <div className="flex items-center gap-x-4">
                <button
                  onClick={() => sliderRef.current.slickPrev()}
                  className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-gray-200 *:cursor-pointer hover:bg-red-400 hover:text-white  text-xl"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={() => sliderRef.current.slickNext()}
                  className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-gray-200 cursor-pointer hover:bg-red-400 hover:text-white  text-xl"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="slider_container">
        <Slider {...settings} ref={sliderRef}>
          {isLoading
            ? [...new Array(6)]?.map((_, index) => {
                <div
                  className={partialItmemsShow > 4 ? "pr-8" : "pr-6"}
                  key={index}
                >
                  <ProductSkeleton />
                </div>;
              })
            : componentData?.map((item, index) => {
                return <ProductCard itemdata={item ? item : {}} key={index} />;
              })}
        </Slider>
      </div>
      {/* {componentData?.map((item, index) => {
        return <ProductCard itemdata={item ? item : {}} key={index} />;
      })} */}
    </>
  );
};

export default ProductCommonLayout;
