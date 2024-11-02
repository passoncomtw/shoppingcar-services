import types from "../constants/actionTypes";

export const getShoppingcarAction = (payload) => ({
  type: types.GET_SHOPPINGCAR,
  payload,
});

export const addProductIntoShoppingcarAction = (payload) => ({
  type: types.ADD_PRODUCT_INTO_SHOPPINGCAR,
  payload,
});
