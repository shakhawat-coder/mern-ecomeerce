import React from "react";
import { Link, useLocation } from "react-router";

const Breadcramb = () => {
  const pathname = useLocation();
  const pathNameArray = pathname.pathname.split("/").filter((item) => item);

  console.log(pathNameArray);

  return (
    <>
      <div className="">
        <Link to="/" className="text-sm hover:text-red-500">
          Home
        </Link>
        {pathNameArray.map((item, index) => {
          const isLast = index === pathNameArray.length - 1;
          return isLast ? (
            <span className="text-sm px-2" key={index}>
              /{item}
            </span>
          ) : (
            <span className="text-sm px-2" key={index}>
              /
              <Link to={`/${item}`} className="text-sm hover:text-red-500">
                {item}
              </Link>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Breadcramb;
