import isEmpty from "lodash/isEmpty";
import Toast from "react-native-toast-message";

export const snackbarHandlerMiddleware = () => (next) => (action) => {
  const { snackbar, ...nextAction } = action;

  if (action["@@redux-saga/SAGA_ACTION"] && !isEmpty(snackbar)) {
    const { title = "系統信息", type = "success", text } = snackbar;
    Toast.show({
      type,
      title,
      text1: text,
    });
  }

  return next(nextAction);
};
