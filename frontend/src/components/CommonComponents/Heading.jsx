import React from "react";

const Heading = ({ heading, description }) => {
  return (
    <>
      <div className="flex flex-col items-start gap-y-4">
        <div className="flex items-center gap-x-4">
          <span className="w-5 h-10 rounded bg-[#DB4444] block"></span>
          <span className="font-semibold text-2xl text-[#DB4444] capitalize ">
            {heading ? heading : "Today's"}
          </span>
        </div>
        <div>
          {description && (
            <h1 className="font-semibold text-4xl text-black capitalize">
              {description ? description : "Flash "}
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Heading;
