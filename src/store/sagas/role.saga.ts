import { doGetAllRole } from './../actions/role.action';
import {
  doDeleteRole,
  doGetRole,
  doGetRoleInfo,
  doPostRole,
  doPutRole,
  doUpdateRolePermissions
} from '@/store/actions/role.action';
import {
  fetchDeleteRole,
  fetchGetRole,
  fetchGetRoleInfo,
  fetchPostRole,
  fetchPutRole,
  fetchPutRolePermissions
} from '@/api';
import { put, takeEvery } from 'redux-saga/effects';
import { call } from '@/utils';
import { getType } from 'typesafe-actions';

function* getRoleList(action: ReturnType<typeof doGetRole.request>): Generator {
  try {
    const response = yield* call(fetchGetRole, action.payload);
    yield put(doGetRole.success(response.data));
  } catch (error) {
    yield put(doGetRole.failure(error));
  }
}

function* getAllRoleList(action: ReturnType<typeof doGetAllRole.request>): Generator {
  try {
    const response = yield* call(fetchGetRole, { page: 1, pageSize: 10000 });
    yield put(doGetAllRole.success(response.data));
  } catch (error) {
    yield put(doGetAllRole.failure(error));
  }
}

function* addRole(action: ReturnType<typeof doPostRole.request>): Generator {
  try {
    const response = yield* call(fetchPostRole, action.payload);
    yield put(doPostRole.success(response.data));
    yield put(doGetRole.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doGetRole.failure(error));
  }
}

function* deleteRole(action: ReturnType<typeof doDeleteRole.request>): Generator {
  try {
    yield* call(fetchDeleteRole, action.payload);
    yield put(doDeleteRole.success());
    yield put(doGetRole.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doDeleteRole.failure(error));
  }
}

function* updateRole(action: ReturnType<typeof doPutRole.request>): Generator {
  try {
    yield* call(fetchPutRole, action.payload);
    yield put(doPutRole.success());
    yield put(doGetRole.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doPutRole.failure(error));
  }
}

function* getRoleInfo(action: ReturnType<typeof doGetRoleInfo.request>): Generator {
  try {
    const response = yield* call(fetchGetRoleInfo, action.payload);
    yield put(doGetRoleInfo.success(response.data));
  } catch (error) {
    yield put(doGetRoleInfo.failure(error));
  }
}

function* updateRolePermission(action: ReturnType<typeof doUpdateRolePermissions.request>): Generator {
  try {
    yield* call(fetchPutRolePermissions, action.payload);
    yield put(doUpdateRolePermissions.success());
  } catch (error) {
    yield put(doUpdateRolePermissions.failure(error));
  }
}

export default function* watchRole() {
  yield takeEvery(getType(doGetRole.request), getRoleList);
  yield takeEvery(getType(doGetAllRole.request), getAllRoleList);
  yield takeEvery(getType(doPostRole.request), addRole);
  yield takeEvery(getType(doDeleteRole.request), deleteRole);
  yield takeEvery(getType(doPutRole.request), updateRole);
  yield takeEvery(getType(doGetRoleInfo.request), getRoleInfo);
  yield takeEvery(getType(doUpdateRolePermissions.request), updateRolePermission);
}
