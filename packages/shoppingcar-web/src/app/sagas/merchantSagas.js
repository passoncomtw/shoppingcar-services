import { createMerchantResult, getMerchantItemsResult, getMerchantsResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* createMerchantSaga({ payload: { onSuccess, ...payload } }) {
  return yield fetchAPIResult({
    actionType: types.CREATE_MERCHANT,
    apiResult: createMerchantResult,
    payload,
    onSuccess,
  });
}

export function* getMerchantsSaga({ payload: { onSuccess, ...payload } }) {
  return yield fetchAPIResult({
    actionType: types.GET_MERCHANTS,
    apiResult: getMerchantsResult,
    payload,
    onSuccess,
  });
}

export function* getMerchantItemsSaga({ payload }) {
  return yield fetchAPIResult({
    actionType: types.GET_MERCHANT_ITEMS,
    apiResult: getMerchantItemsResult,
    payload,
  });
}
