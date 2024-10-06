import types from '../constants/actionTypes';

export const createUserAction = payload => ({
  type: types.CREATE_USER,
  payload,
});
