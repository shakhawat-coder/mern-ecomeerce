import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const findItem = state.value.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (findItem >= 0) {
        // If item already exists in the cart, update its quantity
        state.value[findItem].cartQuantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.value));
      } else {
        // If item does not exist, add it to the cart
        state.value.push({ ...action.payload, cartQuantity: 1 });
        localStorage.setItem("cartItems", JSON.stringify(state.value));
      }
      // state.value = [...state.value, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtocart } = cartSlice.actions;

export default cartSlice.reducer;

// =======class 94 38 minutes=======
