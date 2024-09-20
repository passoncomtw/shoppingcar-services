import { signinResult } from "../../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from '../helpers/sagaHelper';

export function* signinSaga({payload}) {
  return yield fetchAPIResult({
    actionType: types.SIGNIN,
    apiResult: signinResult,
    payload,
    action: types.SIGNIN,
  });
}