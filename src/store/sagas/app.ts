
import { put, call ,select,takeEvery,delay} from 'redux-saga/effects'
import {  getType } from 'typesafe-actions';
import { mapLocationIntoActions } from '@/utils'
import handlers from '@/store/handler'
import { doLogin, doGetUserInfo } from '@/store/actions'
import { fetchLogin, fetchUserInfo } from '@/api'
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import { push } from 'connected-react-router';
import http, { updateToken } from '@/api/http';


function* triggerFetchOnLocation(): Generator {
  if(!http.defaults.headers['Authorization']){
    yield call(updateToken);
  }
  const state = yield select(state => state)
  const actions = mapLocationIntoActions(
    state.router.location,
    handlers,
    state
  )
    .filter(({ disable }) => {
      return disable ? false : true
    })
    .map(({ action }) => action)
    .reduce((a, b) => a.concat(b), [])

  for (let i = 0; i < actions.length; i++) {
    yield put(actions[i])
  }
}


function* login(action: ReturnType<typeof doLogin.request>): Generator {
  try {
    const response: AxiosResponse<{token:string}> = yield call(fetchLogin,action.payload)
    yield put(doLogin.success(response.data))
    message.success('登录成功');
    
    yield call(updateToken,response.data.token);
  } catch (error) {
    yield put(doLogin.failure(error))
    return;
  }
  
  yield delay(300)
  yield put(push("/project-list"))
  
}

function* getUserInfo(action: ReturnType<typeof doGetUserInfo.request>): Generator {
  try {
    const response: any = yield call(fetchUserInfo)
    yield put(doGetUserInfo.success(response.data))

    
  } catch (error) {
    yield put(doGetUserInfo.failure(error))
  }
  
}


export default function* watchApp(){
  
  yield takeEvery(getType(doLogin.request), login);
  yield takeEvery(getType(doGetUserInfo.request), getUserInfo);
  yield takeEvery("@@router/LOCATION_CHANGE", triggerFetchOnLocation);
}