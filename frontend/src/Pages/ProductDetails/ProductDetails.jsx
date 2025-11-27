import React from "react";
import Breadcramb from "../../components/CommonComponents/Breadcramb";
import {
  useGetSingleCategoryQuery,
  useGetSingleProductQuery,
} from "../../Features/Api/exclusive.Api";
import { useParams } from "react-router";
import ProductGallery from "../../components/ProductDetailsPage/ProductGallery/ProductGallery";
import ProductFeature from "../../components/ProductDetailsPage/ProductFeature/ProductFeature";
import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSkeleton";
import Headinh from "../../components/CommonComponents/Heading";
import Heading from "../../components/CommonComponents/Heading";
import ProductCommonLayout from "../../components/CommonComponents/ProductCommonLayout";
import ProductCard from "../../components/CommonComponents/ProductCard";
const ProductDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery(id);
  const categoryId = data?.data?.category?._id;

  // console.log("categoryId", categoryId);

  const relatedProduct = useGetSingleCategoryQuery(categoryId);
  console.log("categoryData", relatedProduct?.data?.data?.products);

  // console.log("data", data);

  return (
    <>
      <div className="container mx-auto py-20">
        <Breadcramb />
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <div className="py-10 grid grid-cols-12">
            <div className="col-span-7">
              <ProductGallery productData={data?.data?.image} />
            </div>
            <div className="col-span-5">
              <ProductFeature productData={data?.data} />
            </div>
          </div>
        )}

        <div className="py-10">
          <div className="">
            <div>
              <ProductCommonLayout
                ProductCard={ProductCard}
                timeStamp={true}
                timeofOffer={1}
                isArrowsTrue={true}
                heading="Related Products"
                description=""
                partialItmemsShow={8}
                componentData={relatedProduct?.data?.data?.products}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
