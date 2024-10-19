import { getOrdersResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* getOrdersSaga({ payload }) {
  return yield fetchAPIResult({
    actionType: types.GET_ORDERS,
    apiResult: getOrdersResult,
    payload,
  });
}
