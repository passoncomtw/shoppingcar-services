import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(merchant = { ...initialState.merchant }, { type, payload }) {
  switch (type) {
    case types.GET_MERCHANTS_SUCCESS:
      return {
        ...merchant,
        ...payload,
      };
    case types.GET_MERCHANT_ITEMS_SUCCESS:
      return {
        ...merchant,
        merchantItems: payload.items,
      };
    case types.GET_MERCHANT_ITEMS:
    case types.GET_MERCHANT_ITEMS_ERROR:
    case types.GET_MERCHANTS:
    case types.GET_MERCHANTS_ERROR:
    default:
      return merchant;
  }
}
