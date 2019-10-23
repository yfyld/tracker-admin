import { doGetTagList, doUpdateTag, doAddTag, doDelTag } from './../actions/metadata.action';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  doGetMetadataList,
  doAddMetadata,
  doGetActiveMetadataList,
  doGetFieldList,
  doGetActiveFieldList
} from '@/store/actions';
import {
  fetchMetadataList,
  fetchMetadataAdd,
  fetchFieldList,
  fetchActiveFieldList,
  fetchTagList,
  fetchTagAdd,
  fetchTagDel,
  fetchTagUpdate
} from '@/api';
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

function* getTagList(action: ReturnType<typeof doGetTagList.request>): Generator {
  try {
    const response = yield* call(fetchTagList, action.payload);
    yield put(doGetTagList.success(response.data));
  } catch (error) {
    yield put(doGetTagList.failure(error));
  }
}

function* addTag(action: ReturnType<typeof doAddTag.request>): Generator {
  try {
    const projectId = yield* select(state => state.project.projectInfo.id);
    yield call(fetchTagAdd, action.payload);
    yield put(doAddTag.success());
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
    const metadataListParams = yield* select(state => state.metadata.metadataListParams);
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doAddTag.failure(error));
  }
}

function* deleteTag(action: ReturnType<typeof doDelTag.request>): Generator {
  try {
    const projectId = yield* select(state => state.project.projectInfo.id);
    yield call(fetchTagDel, action.payload);
    yield put(doDelTag.success());
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
    const metadataListParams = yield* select(state => state.metadata.metadataListParams);
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doDelTag.failure(error));
  }
}

function* updateTag(action: ReturnType<typeof doUpdateTag.request>): Generator {
  try {
    const projectId = yield* select(state => state.project.projectInfo.id);
    yield call(fetchTagUpdate, action.payload);
    yield put(doUpdateTag.success());
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
    const metadataListParams = yield* select(state => state.metadata.metadataListParams);
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doUpdateTag.failure(error));
  }
}

export default function* watchMetadata() {
  yield takeEvery(getType(doGetMetadataList.request), getMetadataList);
  yield takeEvery(getType(doGetActiveMetadataList.request), getActiveMetadataList);
  yield takeEvery(getType(doAddMetadata.request), addMetadata);

  yield takeEvery(getType(doGetFieldList.request), getFieldList);
  yield takeEvery(getType(doGetActiveFieldList.request), getActiveFieldList);

  yield takeEvery(getType(doGetTagList.request), getTagList);
  yield takeEvery(getType(doUpdateTag.request), updateTag);
  yield takeEvery(getType(doAddTag.request), addTag);
  yield takeEvery(getType(doDelTag.request), deleteTag);
}
