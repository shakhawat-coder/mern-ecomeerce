import React from "react";
import {
  useGetAllProductQuery,
  useGetSingleCategoryQuery,
} from "../../../Features/Api/exclusive.Api";
import ProductCard from "../../CommonComponents/ProductCard";

const ProductRight = ({ categoryWiseData }) => {
  console.log(categoryWiseData);

  const { data, isError, isLoading } = useGetAllProductQuery();
  console.log(data);
  const categoryData = useGetSingleCategoryQuery(categoryWiseData);
  console.log(categoryData?.data?.data?.products);

  // const {data,isError,isLoading} = useGetSingleCategoryQuery(categoryWiseData);

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
          // onChange={handleOption}
        >
          <option value="9">9</option>
          <option value="18">18</option>
          <option value="36">36</option>
        </select>
      </div>
      <div className="grid grid-cols-4">
        {categoryWiseData ? (
          categoryData?.data?.data?.products?.length > 0 ? (
            categoryData.data.data.products.map((item, index) => (
              <div className="" key={index}>
                <ProductCard itemdata={item} />
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center py-8">No product found.</p>
          )
        ) : data?.data?.length > 0 ? (
          data.data.map((item, index) => (
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
