import types from '../constants/actionTypes';

export const getTodosAction = payload => ({
  type: types.GET_TODOS,
  payload,
});

export const updateTodoAction = payload => ({
  type: types.UPDATE_TODO,
  payload,
});

export const createTodoAction = payload => ({
  type: types.CREATE_TODO,
  payload,
});
