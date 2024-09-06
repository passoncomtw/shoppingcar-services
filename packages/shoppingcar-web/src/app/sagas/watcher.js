import types from "../constants/actionTypes";
import { takeLatest } from 'redux-saga/effects';
import { SignInSaga } from "./authSagas";

export function* watchSignInSaga() {
  yield takeLatest(types.SIGN_IN, SignInSaga);
}
