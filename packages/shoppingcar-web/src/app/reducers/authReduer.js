import cloneDeep from "lodash/cloneDeep";
import types from "../constants/actionTypes";
import initialState from "./initialState";

const signinSuccess = (auth, payload) => ({
  ...auth,
  ...payload,
  isAuth: true,
});

export default function reducer(auth = { ...cloneDeep(initialState.auth) }, { type, payload }) {
  switch (type) {
    case types.SIGNIN_SUCCESS:
      return signinSuccess(auth, payload);
    case types.SIGNIN:
    case types.SIGNIN_ERROR:
    default:
      return auth;
  }
}
