import { getUserDetailResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from '../helpers/sagaHelper';

export function* getUserDetailSaga({payload}) {
  return yield fetchAPIResult({
    actionType: types.GET_USER_DETAIL,
    apiResult: getUserDetailResult,
    payload,
    resultHandler: respData => respData.item,
  });
}
