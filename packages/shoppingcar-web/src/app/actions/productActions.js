import types from "../constants/actionTypes";

export const getProductsAction = (payload) => ({
  type: types.GET_PRODUCTS,
  payload,
});

export const createProductAction = (payload) => ({
    type: types.CREATE_PRODUCT,
    payload,
  });
  