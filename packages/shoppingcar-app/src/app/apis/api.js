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
export const getUserDetailResult = (payload, customHeaders) => fetchGetWithToken("app/users", customHeaders, payload);
