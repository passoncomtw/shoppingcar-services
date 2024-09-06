import { StrictMode } from 'react';
import { Provider } from "react-redux";
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import configureStore from "./app/store/configureStore";
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();

root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
