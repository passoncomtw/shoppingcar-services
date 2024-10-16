import { fetchGetWithToken, fetchPost, fetchPostWithToken } from "./libs/fetch";

export const signinResult = (payload) => fetchPost("console/login", payload);

export const getUsersResult = (payload, customHeaders) => fetchGetWithToken("console/users", customHeaders, payload);
export const getMerchantsResult = (payload, customHeaders) => fetchGetWithToken("console/merchants", customHeaders, payload);
export const getMerchantItemsResult = (payload, customHeaders) =>
  fetchGetWithToken("console/merchants/items", customHeaders, payload);

export const createUserResult = (payload, customElements) => fetchPostWithToken("console/users", customElements, payload);
