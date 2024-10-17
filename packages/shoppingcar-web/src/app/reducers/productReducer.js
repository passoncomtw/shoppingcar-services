import cloneDeep from "lodash/cloneDeep";
import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(product = { ...cloneDeep(initialState.product) }, { type, payload }) {
  switch (type) {
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...product,
        items: payload.items,
        totalAmount: payload.totalCount,
        pageInfo: payload.pageInfo,
      };
    case types.GET_PRODUCTS:
    case types.GET_PRODUCTS_ERROR:
    default:
      return product;
  }
}
