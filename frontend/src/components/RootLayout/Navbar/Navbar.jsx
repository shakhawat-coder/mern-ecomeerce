import React from "react";
import { Link, NavLink } from "react-router";
import { CiSearch } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
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

  const handleAccount = () => {};
  return (
    <>
      <div className="pt-4 pb-4 border-b-2 border-b-gray-400">
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
                <span className="text-text_black7D8184 text-2xl cursor-pointer">
                  <FaRegHeart />
                </span>
                <Link
                  to={"/cart"}
                  className="text-text_black7D8184 text-2xl amount cursor-pointer"
                  // data-cartTotalItem={cartTotalItem}
                >
                  <BsCart />
                </Link>
                <span
                  className="text-text_whiteFAFAFA text-xl rounded-full bg-redDB4444 p-2 cursor-pointer relative"
                  onClick={handleAccount}
                >
                  <FaUser />
                </span>
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
