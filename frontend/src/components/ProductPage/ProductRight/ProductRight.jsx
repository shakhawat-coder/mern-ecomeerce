import React, { useState } from "react";
import {
  useGetAllProductQuery,
  useGetSingleCategoryQuery,
} from "../../../Features/Api/exclusive.Api";
import ProductCard from "../../CommonComponents/ProductCard";

const ProductRight = ({ categoryWiseData }) => {
  const [page, setPage] = React.useState(1);
  const [showCount, setShowCount] = useState(8);

  const { data, isError, isLoading } = useGetAllProductQuery();
  // console.log(data);
  const categoryData = useGetSingleCategoryQuery(categoryWiseData);
  console.log(categoryData?.data?.data);

  let totalPage = Math.ceil(data?.data?.length / showCount);
  // console.log(totalPage);

  // const {data,isError,isLoading} = useGetSingleCategoryQuery(categoryWiseData);
  //   pagination funtionality
  const handlePerItem = (index) => {
    if (index > 0 && index <= Math.ceil(totalPage)) {
      setPage(index);
    }
  };

  const handleOption = (e) => {
    setShowCount(Number(e.target.value));
    console.log(e.target.value);
  };
  // Get products to display
  const products = categoryWiseData
    ? categoryData?.data?.data?.products || []
    : data?.data || [];
  const productsToShow = products.slice(0, showCount);
  return (
    <>
      <div className="flex justify-end items-center gap-x-2">
        <h2 className="font-popins font-normal text-[16px] text-text_black000000">
          Show :
        </h2>
        <select
          name=""
          id=""
          className="px-4 bg-slate-200 rounded-sm py-1"
          onChange={handleOption}
          value={showCount}
        >
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
      </div>
      <div className="grid grid-cols-4">
        {productsToShow.length > 0 ? (
          productsToShow.map((item, index) => (
            <div className="" key={index}>
              <ProductCard itemdata={item} />
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center py-8">No product found.</p>
        )}
        {isError && <p>Error loading products.</p>}
        {isLoading && <p>Loading...</p>}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="flex justify-center -space-x-px text-base h-10 pt-10">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
              onClick={() => handlePerItem(page - 1)}
            >
              Previous
            </a>
          </li>
          {[...new Array(Math.ceil(totalPage) || 8)].map((_, index) => (
            <li key={index}>
              <span
                href="#"
                className={
                  index + 1 === page
                    ? "flex items-center justify-center px-4 h-10 leading-tight text-white_FFFFFF bg-redDB4444 border border-redDB4444 hover:bg-gray-100 hover:text-gray-700  cursor-pointer"
                    : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  cursor-pointer"
                }
                onClick={() => handlePerItem(index + 1)}
              >
                {index + 1}
              </span>
            </li>
          ))}

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={() => handlePerItem(page + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ProductRight;
