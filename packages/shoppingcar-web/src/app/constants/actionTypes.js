import constants from "flux-constants";

const syncActionTypes = [];

export const basicAsyncActionTypes = ["SIGNIN", "GET_MERCHANTS", "GET_MERCHANT_ITEMS"];

export const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [...result, actionType, `${actionType}_SUCCESS`, `${actionType}_ERROR`];
}, []);

export default constants([...asyncActionTypes, ...syncActionTypes]);
