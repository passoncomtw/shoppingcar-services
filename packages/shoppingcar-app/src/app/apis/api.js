import {
  fetchGetWithToken,
  // fetchGet,
  fetchPost,
  fetchPostWithToken,
} from "./libs/fetch";

export const signinResult = (payload) => fetchPost("app/login", payload);

export const getMerchantsResult = (payload, customHeaders) => fetchGetWithToken("app/merchants", customHeaders, payload);
export const getMerchantProductsResult = (payload, customHeaders) => {
  const { merchantId, ...query } = payload;
  return fetchGetWithToken(`app/merchants/${merchantId}/products`, customHeaders, query);
};

export const getOrdersResult = (payload, customHeaders) => fetchGetWithToken("app/orders", customHeaders, payload);
export const getOrderDetailResult = (payload, customHeaders) =>
  fetchGetWithToken(`app/orders/${payload.orderId}`, customHeaders);

export const getUserDetailResult = (payload, customHeaders) => fetchGetWithToken("app/users", customHeaders, payload);

export const addProductIntoShoppingcarResult = (payload, customHeaders) =>
  fetchPostWithToken(`app/shoppingcars/${payload.merchantId}/products/${payload.productId}`, customHeaders, {
    amount: payload.amount,
  });
export const getShoppingcarResult = (payload, customHeaders) =>
  fetchGetWithToken("app/shoppingcars", customHeaders, payload);
