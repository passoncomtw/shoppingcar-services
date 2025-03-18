import cloneDeep from "lodash/cloneDeep";
import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(shoppingcar = { ...cloneDeep(initialState.shoppingcar) }, { type, payload }) {
  switch (type) {
    case types.GET_SHOPPINGCARS_SUCCESS:
      return {
        ...shoppingcar,
        items: payload.items,
        totalAmount: payload.totalCount,
        pageInfo: payload.pageInfo,
      };
    case types.GET_SHOPPINGCARS:
    case types.GET_SHOPPINGCARS_ERROR:
    default:
      return shoppingcar;
  }
}
