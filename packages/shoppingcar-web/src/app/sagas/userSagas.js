import { getUsersResult, createUserResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* getUsersSaga({ payload }) {
  return yield fetchAPIResult({
    actionType: types.GET_USERS,
    apiResult: getUsersResult,
    payload,
  });
}

export function* createUserSaga({ payload: { onSuccess, ...payload } }) {
  return yield fetchAPIResult({
    actionType: types.CREATE_USER,
    apiResult: createUserResult,
    payload,
    onSuccess,
  });
}
