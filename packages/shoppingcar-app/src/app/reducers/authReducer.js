import cloneDeep from 'lodash/cloneDeep';
import types from '../constants/actionTypes';
import { authState } from './initialState';

const loginSuccess = (auth, payload) =>
  ({ ...auth, ...payload, isAuth: true });

const getUserDetailSuccess = (auth, payload) => {
  return {
    ...auth,
    user: payload,
  };
};

const signoutSuccess = () => cloneDeep(authState);

export default function reducer(auth = cloneDeep(authState), { type, payload }) {
  switch (type) {
    case types.SIGNOUT:
      return signoutSuccess();
    case types.SIGNIN_SUCCESS:
      return loginSuccess(auth, payload);
    case types.GET_USER_DETAIL_SUCCESS:
      return getUserDetailSuccess(auth, payload);
    case types.GET_USER_DETAIL:
    case types.GET_USER_DETAIL_ERROR:
    case types.SIGNIN:
    case types.SIGNIN_ERROR:
    case types.LOGOUT:
    default:
      return auth;
  }
}
