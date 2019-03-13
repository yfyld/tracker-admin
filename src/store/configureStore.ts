import { createStore, applyMiddleware, Store, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from '@/store/reducers'
import sagas from '@/store/sagas'
import { history } from '@/utils'
import { routerMiddleware } from 'connected-react-router'
import { RootState } from '@/types'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  }
}

const routerMiddlewareInstance = routerMiddleware(history)

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState?: RootState): Store {
  const middlewares = [sagaMiddleware, routerMiddlewareInstance]

  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  const store = createStore(reducers, initialState, enhancer)
  sagaMiddleware.run(sagas)

  return store
}

export default configureStore
