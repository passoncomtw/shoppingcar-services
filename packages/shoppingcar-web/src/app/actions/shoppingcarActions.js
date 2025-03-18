import types from "../constants/actionTypes";

export const getShoppingcarsAction = (payload) => ({
  type: types.GET_SHOPPINGCARS,
  payload,
});
