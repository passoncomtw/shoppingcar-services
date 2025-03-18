import types from "../constants/actionTypes";

export const getOrdersAction = () => ({
  type: types.GET_ORDERS,
});

export const getOrderDetailAction = (payload) => ({
  type: types.GET_ORDER_DETAIL,
  payload,
});
