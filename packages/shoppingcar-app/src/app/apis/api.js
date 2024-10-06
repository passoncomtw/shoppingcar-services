import {
  // fetchGet,
  fetchPost,
  fetchGetWithToken,
  // fetchPostWithToken,
  // fetchPutWithToken,
  // fetchPostFormDataWithToken,
} from "./libs/fetch";

export const signinResult = (payload) => fetchPost("app/login", payload);
export const getMerchantsResult = (payload, customHeaders) => fetchGetWithToken("app/merchants", customHeaders, payload);
export const getMerchantProductsResult = (payload, customHeaders) => {
  const {merchantId, ...query} = payload;
  return fetchGetWithToken(`app/merchants/${merchantId}/products`, customHeaders, query)
};
export const getUserDetailResult = (payload, customHeaders) => fetchGetWithToken("app/users", customHeaders, payload);
