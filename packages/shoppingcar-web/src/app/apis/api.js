import {
  fetchGetWithToken,
  // fetchGet,
  fetchPost,
} from "./libs/fetch";

export const signinResult = (payload) => fetchPost("console/login", payload);

export const getMerchantsResult = (payload, customHeaders) => fetchGetWithToken("console/merchants", customHeaders, payload);
export const getMerchantItemsResult = (payload, customHeaders) =>
  fetchGetWithToken("console/merchants/items", customHeaders, payload);
