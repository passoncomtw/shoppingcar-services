import constants from "flux-constants";

const syncActionTypes = ["SIGNOUT"];

export const basicAsyncActionTypes = [
  "SIGNIN",
  "GET_USERS",
  "GET_PRODUCTS",
  "GET_MERCHANTS",
  "GET_MERCHANT_ITEMS",
  "CREATE_USER",
  "CREATE_PRODUCT",
  "CREATE_MERCHANT",
  "UPDATE_USER",
  "UPDATE_MERCHANT",
  "UPDATE_PRODUCT",
];

export const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [...result, actionType, `${actionType}_SUCCESS`, `${actionType}_ERROR`];
}, []);

export default constants([...asyncActionTypes, ...syncActionTypes]);
