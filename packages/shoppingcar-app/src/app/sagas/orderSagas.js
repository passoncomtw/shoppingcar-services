import { getOrderDetailResult, getOrdersResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* getOrdersSaga() {
  return yield fetchAPIResult({
    actionType: types.GET_ORDERS,
    apiResult: getOrdersResult,
  });
}

export function* getOrderDetailSaga({ payload }) {
  return yield fetchAPIResult({
    actionType: types.GET_ORDER_DETAIL,
    apiResult: getOrderDetailResult,
    payload,
  });
}
