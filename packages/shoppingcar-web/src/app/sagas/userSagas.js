import { createUserResult, getUsersResult, updateUserResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from "../helpers/sagaHelper";

export function* getUsersSaga({ payload }) {
  return yield fetchAPIResult({
    actionType: types.GET_USERS,
    apiResult: getUsersResult,
    payload,
  });
}

export function* updateUserSaga({ payload: { onSuccess, ...payload } }) {
  return yield fetchAPIResult({
    actionType: types.UPDATE_USER,
    apiResult: updateUserResult,
    payload,
    onSuccess,
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
