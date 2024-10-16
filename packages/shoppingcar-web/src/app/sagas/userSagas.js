import { createUserResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* createUserSaga({ payload: {onSuccess, ...payload} }) {
  console.log("🚀 ~ function*createUserSaga ~ onSuccess:", onSuccess)
  return yield fetchAPIResult({
    actionType: types.CREATE_USER,
    apiResult: createUserResult,
    payload,
    onSuccess,
  });
}
