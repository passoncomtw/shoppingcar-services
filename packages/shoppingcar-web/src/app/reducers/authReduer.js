import types from "../constants/actionTypes";
import initialState from "./initialState";

const signinSuccess = (auth) => ({
  ...auth,
  isAuth: true,
});

export default function reducer(auth = { ...initialState.auth }, { type, payload }) {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return signinSuccess(auth);
    case types.SIGN_IN:
    case types.SIGN_IN_ERROR:
    default:
      return auth;
  }
}
