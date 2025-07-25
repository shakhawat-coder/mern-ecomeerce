import React from "react";
import { Link } from "react-router";

const NewArrivalItem = ({ itemdata }) => {
  if (!Array.isArray(itemdata)) {
    console.error("Expected itemdata to be an array but got:", itemdata);
    return null;
  }

  const position1 = itemdata.find((item) => item.position === 1);
  const position2 = itemdata.find((item) => item.position === 2);
  const position3 = itemdata.find((item) => item.position === 3);
  const position4 = itemdata.find((item) => item.position === 4);

  console.log("Position1", position1);

  return (
    <>
      <div className="flex justify-between h-[600px] mt-[60px] pb-20">
        <div className="w-[58%] h-full relative">
          <img
            src={position1?.image[0]}
            alt={position1?.title}
            className="w-full h-full object-cover rounded-sm"
          />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-2xl font-bold pb-3">{position1?.title}</h2>
            <p className="text-lg pb-4 max-w-[300px]">
              {position1?.description}
            </p>
            <Link
              to={position1?.category}
              className="text-lg font-semibold border-b border-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-y-4">
          <div className="w-full h-1/2 rounded-sm relative">
            <img
              src={position2?.image[0]}
              alt={position2?.title}
              className="w-full h-full object-cover rounded-sm"
            />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-2xl font-bold pb-3">{position2?.title}</h2>
              <p className="text-lg pb-4 max-w-[300px]">
                {position2?.description}
              </p>
              <Link
                to=""
                className="text-lg font-semibold border-b border-white"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="flex gap-x-[16px] h-[50%] w-full overflow-hidden">
            <div className="w-1/2 relative">
              <img
                src={position3?.image[0]}
                alt={position3?.title}
                className="w-full h-full object-coverrounded-sm"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-2xl font-bold pb-3">{position3?.title}</h2>
                <p className="text-lg pb-4 max-w-[300px]">
                  {position3?.description}
                </p>
                <Link
                  to=""
                  className="text-lg font-semibold border-b border-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="w-1/2 relative">
              <img
                src={position4?.image[0]}
                alt={position4?.title}
                className="w-full h-full object-cover rounded-sm"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-2xl font-bold pb-3">{position4?.title}</h2>
                <p className="text-lg pb-4 max-w-[300px]">
                  {position4?.description}
                </p>
                <Link
                  to=""
                  className="text-lg font-semibold border-b border-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrivalItem;
