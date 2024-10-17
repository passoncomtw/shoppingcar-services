import types from "../constants/actionTypes";

export const createUserAction = (payload) => ({
  type: types.CREATE_USER,
  payload,
});

export const updateUserAction = (payload) => ({
  type: types.UPDATE_USER,
  payload,
});

export const getUsersAction = (payload) => ({
  type: types.GET_USERS,
  payload,
});
