import React, { useEffect } from "react";
import Breadcramb from "../../components/CommonComponents/Breadcramb";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router";

import { RxCross2 } from "react-icons/rx";
import {
  addtocart,
  decreaseCart,
  removeCart,
  getTotal,
} from "../../Features/AllSlice/cartSlice";
import useCalculateDiscount from "../../hooks/useCalculateDiscount";

const Cart = () => {
  const dispatch = useDispatch();
  const { value, cartTotalItem, cartTotalAmount } = useSelector(
    (state) => state?.cart
  );

  useEffect(() => {
    dispatch(getTotal());
  }, [value, dispatch]);

  // Increase quantity handler
  const handleIncrease = (item) => {
    dispatch(addtocart(item));
  };

  // Decrease quantity handler
  const handleDecrease = (item) => {
    dispatch(decreaseCart(item)); // You need to implement decreaseCart in your cartSlice
  };

  // Remove item from cart handler
  const handleRemoveCart = (item) => {
    console.log("Removing item from cart:", item);
    dispatch(removeCart(item));
    // You need to implement removeFromCart in your cartSlice
  };

  return (
    <>
      <div className="container mx-auto py-20">
        <Breadcramb />
        <div className="flex justify-between shadow-lg rounded mb-10">
          <div className="flex-1 py-6  flex justify-start">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000 pl-10">
              Product
            </h1>
          </div>
          <div className=" flex-1  py-6 flex justify-center">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000">
              Price
            </h1>
          </div>
          <div className=" flex-1  py-6  flex justify-center">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000">
              Quantity
            </h1>
          </div>
          <div className=" flex-1  flex justify-end py-6">
            <h1 className="text-[20px] font-popins font-normal text-text_black000000 pr-10">
              Subtotal
            </h1>
          </div>
        </div>
        {value?.map((item) => (
          <div key={item.id} className="">
            <div className="flex justify-between items-center shadow-lg rounded mb-10">
              <div className="relative flex-1 py-6 flex items-center gap-x-4 pl-10">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-[100px] h-[100px] object-cover"
                />
                <span
                  className="text-[20px] absolute top-6 left-10 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center font-popins font-normal text-white cursor-pointer"
                  onClick={() => handleRemoveCart(item)}
                >
                  <RxCross2 />
                </span>
                <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                  {item.name}
                </h1>
              </div>
              <div className="flex-1 py-6 flex justify-center">
                <h1 className="text-[20px] font-popins font-normal text-black">
                  $
                  {useCalculateDiscount(item?.price, item?.discount).toFixed(2)}
                </h1>
              </div>
              <div className="relative flex-1 items-center  py-6 flex justify-center">
                <div className="border flex items-center justify-center gap-3 w-[100px] text-center p-2 rounded-lg">
                  <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                    {item?.cartQuantity}
                  </h1>
                  <div className="flex flex-col items-center">
                    <button
                      className=" text-xl text-black hover:text-green-500 transition-all duration-300"
                      onClick={() => handleIncrease(item)}
                    >
                      <FaChevronUp />
                    </button>
                    <button
                      className=" text-xl text-black hover:text-red-500 transition-all duration-300"
                      onClick={() => handleDecrease(item)}
                      disabled={item.cartQuantity === 1}
                      aria-disabled={item.cartQuantity === 1}
                      style={{
                        opacity: item.cartQuantity === 1 ? 0.5 : 1,
                      }}
                    >
                      <FaChevronDown />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-end py-6 pr-10">
                <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                  $
                  {useCalculateDiscount(item?.price, item?.discount).toFixed(
                    2
                  ) * item.cartQuantity}
                </h1>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <div>
            <Link
              to="/product"
              className="border flex items-center justify-center gap-3  text-center p-2 rounded-lg"
            >
              Return to Shop
            </Link>
          </div>
          <div>
            <Link
              to=""
              className="border flex items-center justify-center gap-3  text-center p-2 rounded-lg"
            >
              Update Cart
            </Link>
          </div>
        </div>
        <div className="flex justify-between mt-20">
          <div className="">
            <input
              className="border px-4 py-2 rounded-sm focus:outline-none focus:border-red-500"
              type="text"
              placeholder="Enter coupon code"
            />
            <button className="border-1 border-transparent text-white px-4 py-2 ml-2 rounded-sm bg-red-500">
              Apply Coupon
            </button>
          </div>
          <div className="border border-gray-200 p-5 w-100 rounded-sm">
            <h1 className="text-[20px] font-popins font-medium text-black mb-4">
              Cart Totals
            </h1>
            <div className="flex justify-between mb-2">
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                Total Items :
              </h1>
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                {cartTotalItem}
              </h1>
            </div>
            <hr className="text-gray-300 py-2" />
            <div className="flex justify-between mb-2">
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                Subtotal :
              </h1>
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                ${cartTotalAmount.toFixed(2)}
              </h1>
            </div>
            <hr className="text-gray-300 py-2" />
            <div className="flex justify-between mb-2">
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                Shipping :
              </h1>
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                60.00
              </h1>
            </div>
            <hr className="text-gray-300 py-2" />
            <div className="flex justify-between mb-2">
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                Total Amount :
              </h1>
              <h1 className="text-[20px] font-popins font-normal text-text_black000000">
                ${cartTotalAmount.toFixed(2) + 60.0}
              </h1>
            </div>
            <hr className="text-gray-300 py-2" />
            <button className="border-1 border-transparent text-white px-4 py-2 mt-4 rounded-sm bg-red-500 w-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
// ==============class 95 21 minutes=======
