import React from "react";

const CategoryItem = ({ itemdata }) => {
  // console.log(itemdata);

  return (
    <>
      <div className="mt-10 mx-5">
        <div className="w-full cursor-pointer text-black transition hover:bg-red-500 hover:text-white h-[145px] bg-transparent rounded border-[1px] border-black flex items-center justify-center ">
          <div className="flex items-center gap-y-3">
            {/* <span className="text-[30px]">{itemData.img}</span> */}
            <h1 className="text-lg font-popins font-normal">{itemdata.name}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

// =========1hr 2mnt done class 91
