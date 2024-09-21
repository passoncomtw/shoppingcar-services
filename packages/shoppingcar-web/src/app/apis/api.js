import {
  // fetchGet,
  fetchPost,
  // fetchGetWithToken,
  // fetchPostWithToken,
  // fetchPutWithToken,
  // fetchPostFormDataWithToken,
} from "./libs/fetch";

export const signinResult = (payload) => fetchPost("console/login", payload);
