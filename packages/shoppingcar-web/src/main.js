import { StrictMode } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import {store, persistor} from "./app/store/configureStore";
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </StrictMode>
    </PersistGate>
  </Provider>
);
