import { fetchGetWithToken, fetchPost, fetchPostWithToken, fetchPutWithToken } from "./libs/fetch";

export const signinResult = (payload) => fetchPost("console/login", payload);

export const getUsersResult = (payload, customHeaders) => fetchGetWithToken("console/users", customHeaders, payload);
export const getUserByUserIdResult = (payload, customHeaders) =>
  fetchGetWithToken(`console/users/${payload.userId}`, customHeaders);

export const createMerchantResult = (payload, customHeaders) =>
  fetchPostWithToken("console/merchants", customHeaders, payload);
export const getMerchantsResult = (payload, customHeaders) => fetchGetWithToken("console/merchants", customHeaders, payload);
export const getMerchantResult = (payload, customHeaders) =>
  fetchGetWithToken(`console/merchants/${payload.merchantId}`, customHeaders, payload);
export const getMerchantItemsResult = (payload, customHeaders) =>
  fetchGetWithToken("console/merchants/items", customHeaders, payload);
export const updateMerchantResult = (payload, customHeaders) => {
  const { merchantId, ...body } = payload;
  return fetchPutWithToken(`console/merchants/${merchantId}`, customHeaders, body);
};
export const updateUserResult = (payload, customHeaders) => {
  const { userId, ...body } = payload;
  return fetchPutWithToken(`console/users/${userId}`, customHeaders, body);
};
export const createUserResult = (payload, customElements) => fetchPostWithToken("console/users", customElements, payload);

export const getProductsResult = (payload, customHeaders) => fetchGetWithToken("console/products", customHeaders, payload);
export const getProductByIdResult = (payload, customHeaders) =>
  fetchGetWithToken(`console/products/${payload.productId}`, customHeaders);
export const updateProductByIdResult = (payload, customHeaders) => {
  const { productId, ...body } = payload;
  return fetchGetWithToken(`console/products/${productId}`, customHeaders, body);
};
export const createProductResult = (payload, customHeaders) =>
  fetchPostWithToken("console/products", customHeaders, payload);


export const getShoppingcarsResult = (payload, customHeaders) => fetchGetWithToken("console/shoppingcars", customHeaders, payload);
