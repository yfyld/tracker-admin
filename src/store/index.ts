// import { StateType } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { createReducer } from '@/utils/util';
import appStore, { AppState } from './module/app';
import { RouterState, connectRouter } from 'connected-react-router'
import {history} from "@/utils"
export interface RootState {
  app: AppState
  router:RouterState
}

const reducerHolders = {};
const effectArray: any[] = [];
const stores = {
    app: appStore
}


for (const key in stores) {
    if (stores.hasOwnProperty(key)) {
        const { state, reducers, effects } = stores[key];
        reducers && (reducerHolders[key] = createReducer(state, reducers));
        effects && (Object.keys(effects).forEach(effectName => {
            effectArray.push(effects[effectName]);
        }));
    }
    
}


const rootReducer = combineReducers({
    ...reducerHolders,
    router: connectRouter(history)
})

function *sagas() {
    yield all(effectArray.map(effect => fork(effect)));
}

export { rootReducer, sagas };
// export type RootState = StateType<typeof rootReducer>;








