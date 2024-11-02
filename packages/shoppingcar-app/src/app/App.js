/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthNavigation, UnauthNavigation } from "./constants/navigations";
import { persistor, store } from "./store/configureStore";

const SwitchNavigation = () => {
  const isAuth = useSelector(({ auth }) => auth.isAuth);

  if (isAuth) return <AuthNavigation />;
  return <UnauthNavigation />;
};

export const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SwitchNavigation />
          <Toast />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
