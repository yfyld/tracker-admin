import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  doGetMetadataList,
  doAddMetadata,
  doGetActiveMetadataList,
  doGetFieldList,
  doGetActiveFieldList
} from '@/store/actions';
import { fetchMetadataList, fetchMetadataAdd, fetchFieldList, fetchActiveFieldList } from '@/api';
import { select, call } from '@/utils';

function* getMetadataList(action: ReturnType<typeof doGetMetadataList.request>): Generator {
  try {
    const response = yield* call(fetchMetadataList, action.payload);
    yield put(doGetMetadataList.success(response.data));
  } catch (error) {
    yield put(doGetMetadataList.failure(error));
  }
}

function* getActiveMetadataList(action: ReturnType<typeof doGetActiveMetadataList.request>): Generator {
  try {
    const response = yield* call(fetchMetadataList, action.payload);
    yield put(doGetActiveMetadataList.success(response.data));
  } catch (error) {
    yield put(doGetActiveMetadataList.failure(error));
  }
}

function* addMetadata(action: ReturnType<typeof doAddMetadata.request>): Generator {
  try {
    const metadataListParams = yield* select(state => state.metadata.metadataListParams);
    yield call(fetchMetadataAdd, action.payload);
    yield put(doAddMetadata.success());
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doAddMetadata.failure(error));
  }
}

function* getFieldList(action: ReturnType<typeof doGetFieldList.request>): Generator {
  try {
    const response = yield* call(fetchFieldList, action.payload);
    yield put(doGetFieldList.success(response.data));
  } catch (error) {
    yield put(doGetFieldList.failure(error));
  }
}

function* getActiveFieldList(action: ReturnType<typeof doGetActiveFieldList.request>): Generator {
  try {
    const response = yield* call(fetchActiveFieldList, action.payload);
    yield put(doGetActiveFieldList.success(response.data));
  } catch (error) {
    yield put(doGetActiveFieldList.failure(error));
  }
}

export default function* watchMetadata() {
  yield takeEvery(getType(doGetMetadataList.request), getMetadataList);
  yield takeEvery(getType(doGetActiveMetadataList.request), getActiveMetadataList);
  yield takeEvery(getType(doAddMetadata.request), addMetadata);

  yield takeEvery(getType(doGetFieldList.request), getFieldList);
  yield takeEvery(getType(doGetActiveFieldList.request), getActiveFieldList);
}
