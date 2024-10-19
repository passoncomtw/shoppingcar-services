import { getShoppingcarsResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* getShoppingcarsSaga({ payload }) {
  return yield fetchAPIResult({
    actionType: types.GET_SHOPPINGCARS,
    apiResult: getShoppingcarsResult,
    payload,
  });
}
