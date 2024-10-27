import { addProductIntoShoppingcarResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* addProductIntoShoppingcarSaga({ payload: { onSucess, ...payload } }) {
  return yield fetchAPIResult({
    actionType: types.ADD_PRODUCT_INTO_SHOPPINGCAR,
    apiResult: addProductIntoShoppingcarResult,
    payload,
    onSucess,
  });
}
