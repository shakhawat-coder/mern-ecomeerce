import React from "react";
import {
  useGetAllProductQuery,
  useGetSingleCategoryQuery,
} from "../../../Features/Api/exclusive.Api";
import ProductCard from "../../CommonComponents/ProductCard";

const ProductRight = ({ categoryWiseData }) => {
  const [showCount, setShowCount] = React.useState(8);
  const { data, isError, isLoading } = useGetAllProductQuery();
  console.log(data);
  const categoryData = useGetSingleCategoryQuery(categoryWiseData);
  console.log(categoryData?.data?.data);

  // const {data,isError,isLoading} = useGetSingleCategoryQuery(categoryWiseData);
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
    </>
  );
};

export default ProductRight;
