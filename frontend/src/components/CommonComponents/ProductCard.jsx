import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router";
import image from "../../assets/react.svg";
import Star from "./Star";
import useCalculateDiscount from "../../hooks/useCalculateDiscount";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../../Features/AllSlice/cartSlice";
const ProductCard = ({ itemdata }) => {
  const dispatch = useDispatch();
  const handleAddtoCart = (item) => {
    // Logic to add item to cart
    dispatch(addtocart(item));
    // console.log("Add to cart:", item);
  };
  const cartItem = useSelector((state) => state?.cart?.value);
  console.log("Cart items:", cartItem);
  return (
    <>
      <div className="mt-10 mx-[15px] group">
        <div className="w-full">
          <div className="bg-gray-200  px-3 pt-4 rounded relative  cursor-pointer">
            <div className="absolute top-5 left-3">
              {itemdata.discount && (
                <span className="px-3 py-2 rounded bg-[#DB4444] text-white text-sm font-semibold">
                  - {itemdata.discount} %
                </span>
              )}
            </div>
            <div className=" absolute top-3 right-3 flex flex-col">
              <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white_FFFFFF cursor-pointer hover:bg-redDB4444 hover:text-white_FFFFFF  text-xl">
                <IoHeartOutline />
              </span>
              <span className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white_FFFFFF cursor-pointer hover:bg-redDB4444 hover:text-white_FFFFFF  text-xl mt-2">
                <MdOutlineRemoveRedEye />
              </span>
            </div>
            <div className="cursor-pointer pb-3">
              <Link to={`/productdetails/${itemdata.name}`}>
                <div className="w-full h-[152px] flex-1">
                  <img
                    src={itemdata ? itemdata.image[0] : image}
                    alt=""
                    className="w-full h-full object-fill"
                  />
                </div>
              </Link>
            </div>
            <div
              className="opacity-0 absolute left-0 bottom-0 font-popins font-medium text-lg cursor-pointer  flex justify-center items-center w-full h-12 bg-black text-white group-hover:opacity-100"
              onClick={() => handleAddtoCart(itemdata)}
            >
              <h3>Add To Cart</h3>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-2 mt-4">
            <Link to={`/productdetails/${itemdata._id}`}>
              <h2 className="text-lg font-popins font-medium text-black cursor-pointer w-full truncate">
                {itemdata ? itemdata.name : "Product Name"}
              </h2>
            </Link>
            <div className="flex items-center gap-x-3 cursor-pointer">
              <span className="text-lg text-red-500 font-medium inline-block">
                $
                {useCalculateDiscount(
                  itemdata?.price,
                  itemdata?.discount
                ).toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                {itemdata ? itemdata.price.toFixed(2) : "00.00"}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-x-1 cursor-pointer">
                <Star rating={itemdata && itemdata.rating} />

                <h3 className="text-text_black000000 opacity-50 font-medium text-lg font-popins ">{`(${itemdata?.reviews?.length})`}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
