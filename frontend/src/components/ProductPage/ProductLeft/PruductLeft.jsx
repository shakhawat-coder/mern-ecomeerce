import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
const PruductLeft = ({
  categoryData,
  isloading,
  handleCategory,
  handleSubCategory,
}) => {
  const [dropdown, setDropdown] = useState(null);
  const handledropdown = (id) => {
    setDropdown(dropdown === id ? null : id);
  };

  return (
    <>
      <div className="">
        <h3 className="text-xl font-bold">Shop by Category</h3>
        <ul className="mt-4">
          {isloading ? (
            <div>Loading...</div>
          ) : (
            categoryData?.map((item) => (
              <div key={item._id}>
                <div
                  className="flex py-3 group items-center justify-between hover:bg-gray-200 transition-all cursor-pointer"
                  onClick={() => {
                    handledropdown(item._id);
                    handleCategory(item._id);
                  }}
                >
                  <li className="group-hover:px-5 transition-all text-md text-black font-normal cursor-pointer">
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
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default PruductLeft;
