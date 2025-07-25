import React from "react";
import ProductCommonLayout from "../../CommonComponents/ProductCommonLayout";
import { useGetAllFlashSaleQuery } from "../../../Features/Api/exclusive.Api";
import ProductCard from "../../CommonComponents/ProductCard";
const FlashSale = () => {
  const { data, isLoading, isError } = useGetAllFlashSaleQuery();

  const allFlashSale = data?.data?.map((item) => {
    return item.product;
  });
  return (
    <>
      <div className="container mx-auto">
        <div className="d-flex flex-col items-center border-b-[1px] border-b-black_363738 mb-10">
          <ProductCommonLayout
            ProductCard={ProductCard}
            timeStamp={new Date("2026-01-01T00:00:00")}
            timeofOffer={1}
            isArrowsTrue={true}
            heading="Today's"
            description="Flash Sale"
            partialItmemsShow={8}
            componentData={allFlashSale}
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

export default FlashSale;
