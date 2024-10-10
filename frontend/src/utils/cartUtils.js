export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate the price of all the times int the cart.
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price. Free shipping over 100 Free. If not Shipping = 10
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price | Tax is 15% of the items price.
  state.taxPrice = addDecimals(Number(0.015 * state.itemsPrice).toFixed(2));

  // Caculate the total prices -> Sum off itemPrice, shippingPrice, and taxPrice
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
