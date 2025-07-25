import React from "react";
import advertiseImage from "/advertise.jpg";
import CountDown from "../../CommonComponents/CountDown";
// import Countdown from "react-countdown";
const Advertise = () => {
  const newYear = new Date("2026-01-01T00:00:00");
  return (
    <>
      <div
        className="container mx-auto flex  items-center"
        style={{
          backgroundImage: `url(${advertiseImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="ms-14">
          <h3 className="text-green-500 text-base font-popins font-semibold">
            Categories
          </h3>
          <h2 className="text-5xl font-bold text-white leading-14 my-8">
            Enhance Your <br /> Music Experience
          </h2>
          <CountDown
            targetDate={newYear}
            size="small"
            minimal="gradient"
            onComplete={() => handleCountdownComplete("New Year")}
          />

          <div className="bg-green-500 inline-block mt-[40px]  text-md font-popins font-medium text-white px-[48px] py-4 rounded cursor-pointer hover:opacity-75">
            Buy Now
          </div>
        </div>
      </div>
    </>
  );
};

export default Advertise;
