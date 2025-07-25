import React from "react";
import ProductCommonLayout from "../../CommonComponents/ProductCommonLayout";
import { useGetAllCategoryQuery } from "../../../Features/Api/exclusive.Api";
import CategoryItem from "../../CommonComponents/CategoryItem";

const Category = () => {
  const { data, isLoading, isError } = useGetAllCategoryQuery();
  // console.log(data?.data);

  return (
    <>
      <div className="container mx-auto">
        <div className="d-flex flex-col items-center border-b-[1px] border-b-black pb-10 mb-10">
          <ProductCommonLayout
            heading="Categories"
            description="Browse By Category"
            isArrowsTrue={true}
            partialItmemsShow={8}
            componentData={data?.data}
            ProductCard={CategoryItem}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Category;
