import { getProductsResult, createProductResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* getProductsSaga({ payload: { onSuccess, ...payload } }) {
  return yield fetchAPIResult({
    actionType: types.GET_PRODUCTS,
    apiResult: getProductsResult,
    payload,
    onSuccess,
  });
}


export function* createProductSaga({ payload: { onSuccess, ...payload } }) {
    return yield fetchAPIResult({
      actionType: types.CREATE_PRODUCT,
      apiResult: createProductResult,
      payload,
      onSuccess,
    });
  }
