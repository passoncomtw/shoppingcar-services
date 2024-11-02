import { isEmpty, isFunction } from "lodash";
import { call, put, select } from "redux-saga/effects";

const okFetch = (payload, actionType, successMessage) => {
  const successPayload = {
    type: `${actionType}_SUCCESS`,
    payload,
    snackbar: isEmpty(successMessage)
      ? null
      : {
          type: "success",
          text: successMessage,
        },
  };

  return successPayload;
};

const errFetch = ({}, actionType, errorMessage) => ({
  type: `${actionType}_ERROR`,
  snackbar: isEmpty(errorMessage)
    ? null
    : {
        type: "error",
        title: "系統訊息",
        text: errorMessage,
      },
});

const parseError = (error) => {
  const { response } = error;

  if (isEmpty(response)) return error;

  const { data: resData } = response;
  return resData.data;
};

const getBodyAndHeaders = ({ type, payload, token, headers }) => {
  const bearerToken = `Bearer ${token}`;
  if (type === "FORM") {
    return {
      params: payload,
      newHeaders: {
        Authorization: bearerToken,
        "Content-Type": "multipart/form-data",
      },
    };
  }

  return {
    params: payload,
    newHeaders: {
      Authorization: bearerToken,
      ...headers,
    },
  };
};

export default function* fetchAPIResult({
  type = "RESTFUL",
  apiResult = () => false,
  headers = {},
  payload = {},
  actionType,
  errorMessage = "",
  successMessage = "",
  onError = null,
  onSuccess = null,
  resultHandler = null,
}) {
  try {
    const token = yield select(({ auth }) => auth.token);

    const { params, newHeaders } = getBodyAndHeaders({
      type,
      payload,
      token,
      headers,
    });

    const { result: resData } = yield call(apiResult, params, newHeaders);

    if (isFunction(resultHandler)) {
      return yield put(okFetch(resultHandler(resData), actionType, successMessage));
    }

    if (isFunction(onSuccess)) onSuccess();

    yield put(okFetch(resData, actionType, successMessage));
  } catch (error) {
    if (isFunction(onError)) onError();
    yield put(errFetch(parseError(error), actionType, errorMessage));
  }
}
