import cloneDeep from "lodash/cloneDeep";
import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(order = { ...cloneDeep(initialState.order) }, { type, payload }) {
  switch (type) {
    case types.GET_ORDERS_SUCCESS:
      return {
        ...order,
        items: payload.items,
        totalAmount: payload.totalCount,
        pageInfo: payload.pageInfo,
      };
    case types.GET_ORDERS:
    case types.GET_ORDERS_ERROR:
    default:
      return order;
  }
}
