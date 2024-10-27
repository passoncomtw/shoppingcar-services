import types from "../constants/actionTypes";

export const addProductIntoShoppingcarAction = (payload) => ({
  type: types.ADD_PRODUCT_INTO_SHOPPINGCAR,
  payload,
});
