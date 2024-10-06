import {
  // fetchGet,
  fetchPost,
  fetchGetWithToken,
  // fetchPostWithToken,
  // fetchPutWithToken,
  // fetchPostFormDataWithToken,
} from "./libs/fetch";

export const signinResult = (payload) => fetchPost("console/login", payload);

export const getMerchantsResult = (payload, customHeaders) => {
  return fetchGetWithToken("console/merchants", customHeaders, payload)
}

export const getMerchantItemsResult = (payload, customHeaders) => {
  return fetchGetWithToken("console/merchants/items", customHeaders, payload)
}