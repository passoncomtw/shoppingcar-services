import types from '../constants/actionTypes';

export const signinAction = payload => ({
  type: types.SIGNIN,
  payload,
});

export const SignOutAction = () => ({
  type: types.SIGNOUT,
});
