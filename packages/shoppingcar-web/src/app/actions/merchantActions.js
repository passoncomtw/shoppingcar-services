import types from '../constants/actionTypes';

export const getMerchantsAction = payload => ({
  type: types.GET_MERCHANTS,
  payload,
});
