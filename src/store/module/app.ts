
import update from 'immutability-helper';
import {  put,take,select } from 'redux-saga/effects';

import { Store } from '@/types';
//import * as Api from "@/api"
import { LOGIN_SUCCESS } from '@/constants';
import { doLogin } from '../actions/app';
import { mapLocationIntoActions } from '@/utils';
import handlers from '@/store/handler';
import { push } from 'connected-react-router'

export interface AppState {
    test:number
}

interface AppStore extends Store{
    state: AppState
}





const store: AppStore = {
    nameSpace: 'app',
    state: {
       test:1
    },
    reducers: {
        [LOGIN_SUCCESS]: (state: AppState) => {
            return update(state, {
                test: { $set: 2 }
            })
        }
    },
    effects: {
        *test(action: ReturnType<typeof doLogin.request>): Generator{
            yield take('@@router/LOCATION_CHANGE')
            try {
                const state = yield select(state=>state)
                const actions=mapLocationIntoActions(state.router.location,handlers,state)
                console.log(state,actions)
                yield put(push("/home"))
            } catch(error) {
                yield put({ type: doLogin.failure } )
            }
            
        },

      
            
    }
}

export default store;