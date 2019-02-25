import { createStore, applyMiddleware, Store, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, sagas } from './index';
import {history} from "@/utils"
import { routerMiddleware } from 'connected-react-router'
import { RootState } from '@/types';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
  }

const routerMiddlewareInstance  = routerMiddleware(history)

const composeEnhancers = (
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

const sagaMiddleware = createSagaMiddleware();


function configureStore(initialState?: RootState): Store {


    const middlewares = [
        sagaMiddleware,
        routerMiddlewareInstance 
      ];
      // compose enhancers
      const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
      );


    return createStore(
        rootReducer,
        initialState,
        enhancer
    )
  
}

const store = configureStore()
sagaMiddleware.run(sagas);

export default store;