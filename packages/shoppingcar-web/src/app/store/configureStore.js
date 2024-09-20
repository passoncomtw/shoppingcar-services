import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers';
import rootSaga from '../sagas';


const persistConfig = {
  key: '!@#$ConsolestoreCache',
  version: 1,
  storage,
  blacklist: [] // What you don't wanna to persist
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({});
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [
      sagaMiddleware,
    ];

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = {
    ...createStore(
      persistedReducer,
      composeEnhancers(applyMiddleware(...middlewares))
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  };

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export const store = configureStore();
export const persistor = persistStore(store);

