import React from "react";
import ProductCommonLayout from "../../CommonComponents/ProductCommonLayout";
import { useGetAllNewArrivalQuery } from "../../../Features/Api/exclusive.Api";
import NewArrivalItem from "../../CommonComponents/NewArrivalItem";
import Heading from "../../CommonComponents/Heading";

const NewArrival = () => {
  const { data, isLoading, isError } = useGetAllNewArrivalQuery();
  console.log("NewArrival data", data);

  return (
    <>
      <div className="container mx-auto">
        <div className="d-flex flex-col items-center border-b-[1px] border-b-black_363738 mb-10">
          <Heading
            heading="New Arrivals"
            description="Discover the latest products"
          />
          {data?.data?.length ? (
            <NewArrivalItem itemdata={data.data} />
          ) : (
            <div>Loading New Arrivals...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewArrival;
