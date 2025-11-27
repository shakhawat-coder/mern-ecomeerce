import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { CiSearch } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaRegHeart, FaUser } from "react-icons/fa";
const Navbar = () => {
  const navItem = [
    {
      id: 1,
      item: "Home",
      pathRoute: "/",
    },

    {
      id: 2,
      item: "Contact",
      pathRoute: "/contact",
    },

    {
      id: 3,
      item: "Product",
      pathRoute: "/product",
    },

    {
      id: 4,
      item: "SignUp",
      pathRoute: "/singup",
    },
  ];

  const cartTotalItem = useSelector((state) => state.cart.cartTotalItem);
  console.log("cartTotalItem", cartTotalItem);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handleAccount = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
  return (
    <>
      <div className="pt-4 pb-4 border-b-2 border-b-gray-400 sticky top-0 z-50 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-inter text-black">
                Exclusive
              </h1>
            </div>
            <div>
              <ul className="flex items-center gap-x-12">
                {navItem?.map((nav) => (
                  <li key={nav.id} className="">
                    <NavLink
                      to={nav.pathRoute}
                      className={({ isPending, isActive }) =>
                        isPending
                          ? "text-black text-[17px] font-normal font-popins"
                          : isActive
                          ? "text-red-500 text-[17px] font-normal font-popins"
                          : "text-black text-[17px] font-normal font-popins"
                      }
                    >
                      {nav.item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="basis-1/3 relative flex items-center justify-between  ">
              <div className="relative">
                <input
                  type="text"
                  className="py-2 bg-[#f5f5f5] rounded px-8"
                  placeholder="What are you looking for?"
                />
                <span className="absolute top-1/2 text-xl right-[10px] translate-y-[-50%] ">
                  <CiSearch />
                </span>
              </div>
              <div className="flex items-center gap-x-[20px] relative">
                <Link to={"/wishlist"}>
                  <span className="text-text_black7D8184 text-2xl cursor-pointer">
                    <FaRegHeart />
                  </span>
                </Link>
                <div className="relative">
                  <Link
                    to={"/cart"}
                    className=" text-text_black7D8184 text-2xl amount cursor-pointer"
                    // data-cartTotalItem={cartTotalItem}
                  >
                    <BsCart />
                    <span className="absolute top-[-10px] right-[-15px] w-6 h-6 text-sm rounded-full bg-red-500 text-white flex items-center justify-center p-2">
                      {cartTotalItem}
                    </span>
                  </Link>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <span
                    className={` text-xl rounded-full w-10 h-10 flex items-center justify-center cursor-pointer relative transition-colors duration-200 ${
                      showDropdown
                        ? "bg-red-600 text-white"
                        : "bg-transparent text-gray-500"
                    }`}
                    onClick={handleAccount}
                  >
                    <FaUser />
                  </span>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-max   bg-linear-to-r from-gray-500 to-gray-700 rounded shadow-lg z-50 backdrop-opacity-50 ">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-white hover:bg-red-400"
                      >
                        Manage My Account
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-white hover:bg-red-400"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/cancelled-orders"
                        className="block px-4 py-2 text-white hover:bg-red-400"
                      >
                        Cancelled Orders
                      </Link>

                      <button
                        className="block w-full text-left px-4 py-2 text-white hover:bg-red-400 cursor-pointer"
                        onClick={() => {
                          setShowDropdown(false);
                          // Add your logout logic here
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
// ========class 93 done========
