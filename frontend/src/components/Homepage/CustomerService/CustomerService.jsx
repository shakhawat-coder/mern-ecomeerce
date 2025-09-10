import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { SiAdguard } from "react-icons/si";
const CustomerService = () => {
  const service = [
    {
      id: 1,
      icons: (
        <TbTruckDelivery className="text-4xl text-white_FFFFFF bg-text_black000000 w-[70px] h-[70px] rounded-full p-3" />
      ),
      tittle: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      id: 2,
      icons: (
        <TfiHeadphoneAlt className="text-4xl text-white_FFFFFF bg-text_black000000 w-[70px] h-[70px] rounded-full p-3" />
      ),
      tittle: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },

    {
      id: 3,
      icons: (
        <SiAdguard className="text-4xl text-white_FFFFFF bg-text_black000000 w-[70px] h-[70px] rounded-full p-3" />
      ),
      tittle: "Money Back Guarantee",
      description: "We reurn money within 30 days",
    },
  ];
  return (
    <>
      <div className="my-20">
        <div className="container mx-auto">
          <div className="flex items-center justify-evenly">
            {service?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center"
              >
                <span className="inline-block  p-3 rounded-full bg-[rgba(47,46,48,0.3)] ">
                  {item.icons}
                </span>
                <h1 className="text-lg font-semibold font-popins text-text_black000000 mt-6">
                  {item.tittle}
                </h1>
                <h3 className="text-sm font-normal font-popins text-text_black000000 mt-2">
                  {item.description}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerService;
