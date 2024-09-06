// import types from "../constants/actionTypes";
import initialState from "./initialState";

export default function reducer(todo = { ...initialState.todo }, { type, payload }) {
  switch (type) {
    default:
      return todo;
  }
}
