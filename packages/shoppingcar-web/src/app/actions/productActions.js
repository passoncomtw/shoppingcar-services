import types from '../constants/actionTypes';

export const getProductsAction = payload => ({
    type: types.GET_PRODUCTS,
    payload,
  });

