import React, { useState } from "react";
import Breadcramb from "../../components/CommonComponents/Breadcramb";
import PruductLeft from "../../components/ProductPage/ProductLeft/PruductLeft";
import ProductRight from "../../components/ProductPage/ProductRight/ProductRight";
import { useGetAllCategoryQuery } from "../../Features/Api/exclusive.Api";

const Product = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { data, isError, isLoading } = useGetAllCategoryQuery();
  const handleCategory = (id) => {
    console.log(id);

    setCategoryId(id);
  };
  return (
    <>
      <div className="container mx-auto py-20">
        <Breadcramb />
        <div className="flex justify-between mt-10">
          <div className="w-[25%]">
            <PruductLeft
              categoryData={data?.data}
              error={isError}
              isloading={isLoading}
              handleCategory={handleCategory}
            />
          </div>
          <div className="w-[74%]">
            <ProductRight categoryWiseData={categoryId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
