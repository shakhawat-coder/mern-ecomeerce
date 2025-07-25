import React from "react";

const useCalculateDiscount = (price = 0, discount = 0) => {
  // console.log(price, discount);

  const discountAmount = price * (discount / 100);
  const discountedPrice = price - discountAmount;
  return discountedPrice;
};

export default useCalculateDiscount;
