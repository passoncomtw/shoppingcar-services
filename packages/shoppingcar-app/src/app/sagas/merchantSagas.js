import { getMerchantsResult, getMerchantProductsResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from '../helpers/sagaHelper';

export function* getMerchantsSaga({payload}) {
  return yield fetchAPIResult({
    actionType: types.GET_MERCHANTS,
    apiResult: getMerchantsResult,
    payload,
  });
}

export function* getMerchantProductsSaga({payload}) {
  return yield fetchAPIResult({
    actionType: types.GET_MERCHANT_PRODUCTS,
    apiResult: getMerchantProductsResult,
    payload,
  });
}
