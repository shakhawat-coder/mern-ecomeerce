import React, { useState } from "react";
import { category } from "../../../../Data/data";
import { FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import BannerSkeleton from "../../Skeleton/BannerSkeleton";
import {
  useGetAllBannerQuery,
  useGetAllCategoryQuery,
} from "../../../Features/Api/exclusive.Api";

const Banner = () => {
  // console.log(import.meta.env.VITE_DOMAIN_NAME);

  const [currentSlider, setCurrentslider] = useState(0);
  const settings = {
    dots: true,
    infinite: false,
    loop: false,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) =>
      i == currentSlider ? (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#DB4444",
            border: "3px solid #ffff",
            marginRight: "12px",
            cursor: "pointer",
          }}
        ></div>
      ) : (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#ffff",
            opacity: "0.5",
            marginRight: "12px",
            cursor: "pointer",
          }}
        ></div>
      ),
    afterChange: function (currentSlider) {
      setCurrentslider(currentSlider);
    },
  };
  const [dropdown, setDropdown] = useState(null);
  const { data, error, isLoading } = useGetAllBannerQuery();
  // const [openDropdown, setOpenDropdown] = useState(null);
  const allCategory = useGetAllCategoryQuery();

  console.log(allCategory.data?.data[1]?.subcategories);

  const handledropdown = (id) => {
    setDropdown(dropdown === id ? null : id);
  };

  return (
    <>
      <div>
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="w-[23%] pt-10 border-r-[1.5px] border-r-gray-500">
              <ul>
                {allCategory?.data?.data?.map((item) => (
                  <div key={item._id}>
                    <div className="flex py-3 group items-center justify-between hover:bg-gray-200 transition-all cursor-pointer">
                      <li
                        className="group-hover:px-5 transition-all text-md text-black font-normal cursor-pointer"
                        onClick={() => handledropdown(item._id)}
                      >
                        {item.name}
                      </li>
                      {item.subcategories.length > 0 && (
                        <span
                          className="pr-5 h-5 text-xl text-black"
                          onClick={() => handledropdown(item._id)}
                        >
                          <FaChevronRight />
                        </span>
                      )}
                    </div>

                    {/* ✅ Render subcategories directly under the li */}
                    {dropdown === item._id && item.subcategories.length > 0 && (
                      <ul className=" bg-gray-100 transition-all">
                        {item.subcategories.map((subcat) => (
                          <li
                            key={subcat._id}
                            className="p-2 text-md text-black font-normal cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
                          >
                            {subcat.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ul>
            </div>
            <div className="w-[77%] h-[440px] pl-11 mt-10">
              <div className="slider_container">
                {isLoading ? (
                  <BannerSkeleton />
                ) : (
                  <Slider {...settings}>
                    {data?.data.map((banner, index) => (
                      <div key={index}>
                        <img
                          src={banner.image}
                          alt={banner.image}
                          className="h-[440px] w-full object-fit-fill"
                        />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
