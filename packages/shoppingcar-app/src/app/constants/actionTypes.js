import constants from "flux-constants";

const syncActionTypes = [
  "SIGNOUT",
  "START_FETCHING",
  "STOP_FETCHING",
];

export const basicAsyncActionTypes = [
  "SIGNIN",
  "GET_MERCHANTS",
  "GET_MERCHANT_PRODUCTS",
  "GET_USER_DETAIL",
  "GET_ORDERS",
  "GET_ORDER_DETAIL",
  "ADD_PRODUCT_INTO_SHOPPINGCAR",
];

export const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [
    ...result,
    actionType,
    `${actionType}_SUCCESS`,
    `${actionType}_ERROR`
  ];
}, []);

export default constants([...asyncActionTypes, ...syncActionTypes]);