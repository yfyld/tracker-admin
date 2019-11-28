import { doGetUserList } from './../actions/app.action';
import { put, takeEvery, delay } from 'redux-saga/effects';

import { getType } from 'typesafe-actions';
import { mapLocationIntoActions, call, select } from '@/utils';

import { doLogin, doGetUserInfo, doResetStore } from '@/store/actions';
import { fetchLogin, fetchUserInfo, fetchUserList } from '@/api';

import { message } from 'antd';
import { push } from 'connected-react-router';
import http, { updateToken } from '@/api/http';
import handlers from '@/router/handler';

function* triggerFetchOnLocation(): Generator {
  if (!http.defaults.headers['Authorization']) {
    yield call(updateToken);
  }
  const state = yield* select(state => state);

  const actions = mapLocationIntoActions(state.router.location, handlers, state)
    .filter(({ disable }) => {
      return disable ? false : true;
    })
    .map(({ action }) => action)
    .reduce((a, b) => a.concat(b), []);

  for (let i = 0; i < actions.length; i++) {
    yield put(actions[i]);
  }
}

function* login(action: ReturnType<typeof doLogin.request>): Generator {
  try {
    const response = yield* call(fetchLogin, action.payload);
    yield put(doLogin.success(response.data));
    message.success('登录成功');

    yield call(updateToken, response.data.accessToken);
    yield delay(300);
    yield put(push('/project-list'));
  } catch (error) {
    yield put(doLogin.failure(error));
    return;
  }
}

function* getUserInfo(action: ReturnType<typeof doGetUserInfo.request>): Generator {
  try {
    const response = yield* call(fetchUserInfo);
    yield put(doGetUserInfo.success(response.data));
  } catch (error) {
    yield put(doGetUserInfo.failure(error));
  }
}

function* getUserList(action: ReturnType<typeof doGetUserList.request>): Generator {
  try {
    const response = yield* call(fetchUserList, action.payload);
    yield put(doGetUserList.success(response.data));
  } catch (error) {
    yield put(doGetUserList.failure(error));
  }
}

function* resetStore(action: ReturnType<typeof doResetStore>): Generator {
  window.localStorage.removeItem('token');
  updateToken('');
}

export default function* watchApp() {
  yield takeEvery(getType(doLogin.request), login);
  yield takeEvery(getType(doGetUserInfo.request), getUserInfo);
  yield takeEvery(getType(doGetUserList.request), getUserList);
  yield takeEvery('@@router/LOCATION_CHANGE', triggerFetchOnLocation);
  yield takeEvery(getType(doResetStore), resetStore);
}
