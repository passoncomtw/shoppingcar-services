import types from '../constants/actionTypes';

export const getMerchantsAction = payload => ({
  type: types.GET_MERCHANTS,
  payload,
});

export const getMerchantItemsAction = payload => ({
  type: types.GET_MERCHANT_ITEMS,
  payload,
});
