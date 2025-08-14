import { createSlice } from "@reduxjs/toolkit";
import { errorToast, infoToast, successToast } from "../../helper/Toast";

const initialState = {
  value: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ===========add & increase item to cart===========
    addtocart: (state, action) => {
      const findItem = state.value.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (findItem >= 0) {
        state.value[findItem].cartQuantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.value));
        infoToast(`${action.payload.name} quantity increased in cart`);
      } else {
        // If item does not exist, add it to the cart
        state.value.push({ ...action.payload, cartQuantity: 1 });
        localStorage.setItem("cartItems", JSON.stringify(state.value));
        successToast(`${action.payload.name} added to cart`);
      }
      // state.value = [...state.value, action.payload];
    },
    // ===========decrease item quantity in cart===========
    decreaseCart: (state, action) => {
      const findItem = state.value.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (findItem >= 0 && state.value[findItem].cartQuantity > 1) {
        state.value[findItem].cartQuantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.value));
        infoToast(`${action.payload.name} quantity decreased in cart`);
      } else if (findItem >= 0 && state.value[findItem].cartQuantity === 1) {
        // If quantity is 1, remove the item from the cart
        state.value = state.value.filter(
          (item) => item._id !== action.payload._id
        );
        localStorage.setItem("cartItems", JSON.stringify(state.value));
        errorToast(`${action.payload.name} removed from cart`);
      }
    },
    // ===========remove item from cart===========
    removeCart: (state, action) => {
      const findItem = state.value.filter((item) => {
        return item._id === action.payload._id;
      });
      if (findItem.length > 0) {
        state.value = state.value.filter(
          (item) => item._id !== action.payload._id
        );
        localStorage.setItem("cartItems", JSON.stringify(state.value));
        errorToast(`${action.payload.name} removed from cart`);
      } else {
        infoToast(`${action.payload.name} not found in cart`);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtocart, removeCart, decreaseCart } = cartSlice.actions;

export default cartSlice.reducer;

// =======class 94 38 minutes=======
