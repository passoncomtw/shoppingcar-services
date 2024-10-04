import { getMerchantsResult } from "../apis/api";
import types from "../constants/actionTypes";
import fetchAPIResult from '../helpers/sagaHelper';

export function* getMerchantsSaga({payload}) {
  return yield fetchAPIResult({
    actionType: types.GET_MERCHANTS,
    apiResult: getMerchantsResult,
    payload,
  });
}
