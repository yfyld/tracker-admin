import {
  doGetUserList,
  doGetUserRoles,
  doPutUserRoles,
  doSignup,
  doPutUserByAdmin,
  doLogout
} from './../actions/app.action';
import { put, takeEvery, delay } from 'redux-saga/effects';

import { getType } from 'typesafe-actions';
import { mapLocationIntoActions, call, select } from '@/utils';

import {
  doLogin,
  doGetUserInfo,
  doResetStore,
  doAddProject,
  doGetProjectList,
  doPutRole,
  doGetRole,
  doUpdateRolePermissions,
  doPutUser,
  doDeletePermission,
  doGetPermission,
  doDeleteUser
} from '@/store/actions';
import {
  fetchSignIn,
  fetchProjectAdd,
  fetchSignUp,
  fetchUserInfo,
  fetchUserList,
  fetchPutRole,
  fetchGetRoleInfo,
  fetchPutRolePermissions,
  fetchPutUser,
  fetchGetUserRoles,
  fetchPutUserRoles,
  fetchDeletePermission,
  fetchDeleteUser,
  fetchPutUserByAdmin,
  fetchSignOut
} from '@/api';

import { message } from 'antd';
import { push } from 'connected-react-router';
import http, { updateToken } from '@/api/http';
import handlers from '@/router/handler';
import { ROUTE_PATH } from '@/constants';

function* triggerFetchOnLocation(): Generator {
  if (!http.defaults.headers['Authorization']) {
    yield call(updateToken);
  }
  const state = yield* select((state) => state);

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
    const response = yield* call(fetchSignIn, action.payload);
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

function* logout(action: ReturnType<typeof doLogin.request>): Generator {
  try {
    yield* call(fetchSignOut);
    yield put(doLogout.success());
    yield put(doResetStore());
    message.success('注销成功');

    yield call(updateToken, '');
    yield delay(300);
    yield put(push('/login'));
  } catch (error) {
    yield put(doLogout.failure(error));
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

function* addUser(action: ReturnType<typeof doSignup.request>): Generator {
  try {
    const response = yield* call(fetchSignUp, action.payload);
    yield put(doSignup.success(response.data));
    // yield put(doGetUserList.request({ page: 1, pageSize: 20 }));
    message.success('注册成功');
    yield put(push(ROUTE_PATH.login));
  } catch (error) {
    yield put(doGetUserList.failure(error));
  }
}

function* resetStore(action: ReturnType<typeof doResetStore>): Generator {
  window.localStorage.removeItem('token');
  updateToken('');
}

function* updateUser(action: ReturnType<typeof doPutUser.request>): Generator {
  try {
    yield* call(fetchPutUser, action.payload);
    yield put(doPutUser.success());
  } catch (error) {
    yield put(doPutUser.failure(error));
  }
}

function* updateUserByAdmin(action: ReturnType<typeof doPutUserByAdmin.request>): Generator {
  try {
    yield* call(fetchPutUserByAdmin, action.payload);
    yield put(doPutUserByAdmin.success());
    yield put(doGetUserList.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doPutUserByAdmin.failure(error));
  }
}

function* getUserRoles(action: ReturnType<typeof doGetUserRoles.request>): Generator {
  try {
    const response = yield* call(fetchGetUserRoles, action.payload);
    yield put(doGetUserRoles.success(response.data));
  } catch (error) {
    yield put(doGetUserRoles.failure(error));
  }
}

function* updateUserRole(action: ReturnType<typeof doPutUserRoles.request>): Generator {
  try {
    yield* call(fetchPutUserRoles, action.payload);
    yield put(doPutUserRoles.success());
  } catch (error) {
    yield put(doPutUserRoles.failure(error));
  }
}

function* deleteUser(action: ReturnType<typeof doDeleteUser.request>): Generator {
  try {
    yield* call(fetchDeleteUser, action.payload);
    yield put(doDeleteUser.success());
    yield put(doGetUserList.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doDeleteUser.failure(error));
  }
}

export default function* watchApp() {
  yield takeEvery(getType(doLogin.request), login);
  yield takeEvery(getType(doLogout.request), logout);

  yield takeEvery(getType(doSignup.request), addUser);
  yield takeEvery(getType(doGetUserInfo.request), getUserInfo);
  yield takeEvery(getType(doGetUserList.request), getUserList);
  yield takeEvery(getType(doPutUser.request), updateUser);
  yield takeEvery(getType(doPutUserByAdmin.request), updateUserByAdmin);

  yield takeEvery(getType(doGetUserRoles.request), getUserRoles);
  yield takeEvery(getType(doPutUserRoles.request), updateUserRole);
  yield takeEvery(getType(doDeleteUser.request), deleteUser);
  yield takeEvery('@@router/LOCATION_CHANGE', triggerFetchOnLocation);
  yield takeEvery(getType(doResetStore), resetStore);
}
