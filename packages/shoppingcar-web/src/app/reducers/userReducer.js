import cloneDeep from "lodash/cloneDeep";
import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(user = { ...cloneDeep(initialState.user) }, { type, payload }) {
  switch (type) {
    case types.GET_USERS_SUCCESS:
      return {
        ...user,
        ...payload,
      };
    case types.GET_USERS:
    case types.GET_USERS_ERROR:
    default:
      return user;
  }
}
