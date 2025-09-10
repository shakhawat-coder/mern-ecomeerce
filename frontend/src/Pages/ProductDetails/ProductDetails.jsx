import React from "react";
import Breadcramb from "../../components/CommonComponents/Breadcramb";
import { useGetSingleProductQuery } from "../../Features/Api/exclusive.Api";
import { useParams } from "react-router";
import ProductGallery from "../../components/ProductDetailsPage/ProductGallery/ProductGallery";
import ProductFeature from "../../components/ProductDetailsPage/ProductFeature/ProductFeature";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(id);
  console.log("data", data);

  return (
    <>
      <div className="container mx-auto py-20">
        <Breadcramb />
        <div className="py-10 grid grid-cols-12">
          <div className="col-span-7">
            <ProductGallery productData={data?.data?.image} />
          </div>
          <div className="col-span-5">
            <ProductFeature productData={data?.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
