import { doGetAllPermission } from './../actions/permission.action';
import {
  doDeletePermission,
  doGetPermission,
  doPostPermission,
  doPutPermission
} from '@/store/actions/permission.action';
import { fetchDeletePermission, fetchGetPermission, fetchPostPermission, fetchPutPermission } from '@/api';
import { put, takeEvery } from 'redux-saga/effects';
import { call } from '@/utils';
import { getType } from 'typesafe-actions';

function* getPermissionList(action: ReturnType<typeof doGetPermission.request>): Generator {
  try {
    const response = yield* call(fetchGetPermission, action.payload);
    yield put(doGetPermission.success(response.data));
  } catch (error) {
    yield put(doGetPermission.failure(error));
  }
}

function* getAllPermissionList(action: ReturnType<typeof doGetAllPermission.request>): Generator {
  try {
    const response = yield* call(fetchGetPermission, { page: 1, pageSize: 10000 });
    yield put(doGetAllPermission.success(response.data));
  } catch (error) {
    yield put(doGetAllPermission.failure(error));
  }
}

function* addPermission(action: ReturnType<typeof doPostPermission.request>): Generator {
  try {
    const response = yield* call(fetchPostPermission, action.payload);
    yield put(doPostPermission.success(response.data));
    yield put(doGetPermission.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doGetPermission.failure(error));
  }
}

function* deletePermission(action: ReturnType<typeof doDeletePermission.request>): Generator {
  try {
    yield* call(fetchDeletePermission, action.payload);
    yield put(doDeletePermission.success());
    yield put(doGetPermission.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doDeletePermission.failure(error));
  }
}

function* updatePermission(action: ReturnType<typeof doPutPermission.request>): Generator {
  try {
    yield* call(fetchPutPermission, action.payload);
    yield put(doPutPermission.success());
    yield put(doGetPermission.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doPutPermission.failure(error));
  }
}

export default function* watchPermission() {
  yield takeEvery(getType(doGetPermission.request), getPermissionList);
  yield takeEvery(getType(doGetAllPermission.request), getAllPermissionList);
  yield takeEvery(getType(doPostPermission.request), addPermission);
  yield takeEvery(getType(doDeletePermission.request), deletePermission);
  yield takeEvery(getType(doPutPermission.request), updatePermission);
}
