import { createSlice } from "@reduxjs/toolkit";
import { addDecimals, updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const item = action.payload;

      // Check if thetiem is alread in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If exist, update quantity
        state.cartItems = state.cartItems.map((x) => {
          return x._id === existItem._id ? item : x;
        });
      } else {
        // If not eists, add new item ot cartItems
        state.cartItems = [...state.cartItems, item];
      }
      // Class says to have return updateCart(state);
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      // Filter out the item ot remove from the cart
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      // Update the prices and save to storage
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState),
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
