import cloneDeep from 'lodash/cloneDeep';
import types from '../constants/actionTypes';
import { authState } from './initialState';

const loginSuccess = (auth, payload) =>
  ({ ...auth, ...payload, isAuth: true });

const logoutSuccess = () => cloneDeep(authState);

export default function reducer(auth = cloneDeep(authState), { type, payload }) {
  switch (type) {
    case types.LOGOUT:
      return logoutSuccess();
    case types.SIGNIN_SUCCESS:
      return loginSuccess(auth, payload);
    case types.SIGNIN:
    case types.SIGNIN_ERROR:
    case types.LOGOUT:
    default:
      return auth;
  }
}
