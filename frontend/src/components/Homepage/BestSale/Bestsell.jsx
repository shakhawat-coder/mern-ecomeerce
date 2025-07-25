import React from "react";
import ProductCommonLayout from "../../CommonComponents/ProductCommonLayout";
import { useGetAllBestSaleQuery } from "../../../Features/Api/exclusive.Api";
import ProductCard from "../../CommonComponents/ProductCard";
const Bestsell = () => {
  const { data, isLoading, isError } = useGetAllBestSaleQuery();
  const allBestSale = data?.data?.map((item) => {
    return item.product;
  });

  return (
    <>
      <div className="container mx-auto">
        <div className="d-flex flex-col items-center border-b-[1px] border-b-black_363738 mb-10">
          <ProductCommonLayout
            ProductCard={ProductCard}
            timeStamp={true}
            timeofOffer={1}
            isArrowsTrue={true}
            heading="Today's"
            description="Best Selling  Products"
            partialItmemsShow={8}
            componentData={allBestSale}
            isLoading={isLoading}
          />
          <div className="pb-20 pt-10 text-center">
            <button className="px-[48px] py-4 bg-red-500 rounded text-md font-popins font-medium text-white hover:opacity-75 cursor-pointer ">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bestsell;
