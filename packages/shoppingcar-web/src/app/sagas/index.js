import isEmpty from "lodash/isEmpty";
import { all, fork, takeLatest } from "redux-saga/effects";
import types, { basicAsyncActionTypes } from "../constants/actionTypes";
import { toCamelStyle } from "../helpers/format";

import * as authSagas from "./authSagas";
import * as merchantSagas from "./merchantSagas";
import * as orderSagas from "./orderSagas";
import * as productSagas from "./productSagas";
import * as shoppingcarSagas from "./shoppingcarSagas";
import * as userSagas from "./userSagas";
import * as Watchers from "./watchers";

const allSaga = {
  ...authSagas,
  ...userSagas,
  ...orderSagas,
  ...productSagas,
  ...merchantSagas,
  ...shoppingcarSagas,
};

const getMatchedSaga = (actionType) => {
  const camelActionType = toCamelStyle(actionType);
  const matchedSaga = allSaga[`${camelActionType}Saga`];
  return matchedSaga || null;
};

export default function* startForman() {
  let sagas = [];
  // for auto generate
  basicAsyncActionTypes.forEach((actionType) => {
    const currentSaga = getMatchedSaga(actionType);

    if (!currentSaga) {
      console.error(`NOT DEFINED SAGA FOR: ${actionType}`);
      return;
    }

    const generatingFunction = function* () {
      yield takeLatest(types[actionType], currentSaga);
    };
    sagas.push(fork(generatingFunction));
  });

  // for customize saga
  for (let key in Watchers) {
    const sagaWatcher = Watchers[key];
    if (!isEmpty(sagaWatcher)) {
      sagas.push(fork(sagaWatcher));
    }
  }
  yield all(sagas);
}
