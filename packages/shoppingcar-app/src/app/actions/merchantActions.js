import types from "../constants/actionTypes";

export const getMerchantsAction = () => ({
  type: types.GET_MERCHANTS,
});

export const getMerchantProductsAction = (payload) => ({
  type: types.GET_MERCHANT_PRODUCTS,
  payload,
});
