import {
  doGetTagList,
  doUpdateTag,
  doAddTag,
  doDelTag,
  doAddMetadataByExcel,
  doUpdateMetadataLog,
  doBatchMetadata
} from './../actions/metadata.action';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  doGetMetadataList,
  doAddMetadata,
  doUpdateMetadata,
  doDeleteMetadata,
  doEnableMetadata,
  doDisableMetadata,
  doGetActiveMetadataList,
  doGetFieldList
} from '@/store/actions';
import {
  fetchMetadataList,
  fetchMetadataAdd,
  fetchMetadataUpdate,
  fetchMetadataDelete,
  fetchMetadataEnable,
  fetchMetadataDisable,
  fetchFieldList,
  fetchTagList,
  fetchTagAdd,
  fetchTagDel,
  fetchTagUpdate,
  fetchMetadataAddByExcel,
  fetchMetadataLogUpdate,
  fetchBatchMetadata
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
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield call(fetchMetadataAdd, action.payload);
    yield put(doAddMetadata.success());
    yield put(doGetMetadataList.request(metadataListParams));
    // 因为可能会新增标签，所以需要重新获取一下
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
  } catch (error) {
    yield put(doAddMetadata.failure(error));
  }
}

function* addMetadataByExcel(action: ReturnType<typeof doAddMetadataByExcel.request>): Generator {
  try {
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield call(fetchMetadataAddByExcel, action.payload);
    yield put(doAddMetadataByExcel.success());
    yield put(doGetMetadataList.request(metadataListParams));
    // 因为可能会新增标签，所以需要重新获取一下
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
  } catch (error) {
    yield put(doAddMetadataByExcel.failure(error));
  }
}

function* updateMetadata(action: ReturnType<typeof doUpdateMetadata.request>): Generator {
  try {
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield call(fetchMetadataUpdate, action.payload);
    yield put(doUpdateMetadata.success());
    yield put(doGetMetadataList.request(metadataListParams));
    // 因为可能会新增标签，所以需要重新获取一下
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
  } catch (error) {
    yield put(doUpdateMetadata.failure(error));
  }
}

function* updateMetadataLog(action: ReturnType<typeof doUpdateMetadataLog.request>): Generator {
  try {
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield call(fetchMetadataLogUpdate, action.payload);
    yield put(doUpdateMetadataLog.success());
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doUpdateMetadataLog.failure(error));
  }
}

function* deleteMetadata(action: ReturnType<typeof doDeleteMetadata.request>): Generator {
  try {
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield call(fetchMetadataDelete, projectId, action.payload);
    yield put(doDeleteMetadata.success());
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doDeleteMetadata.failure(error));
  }
}

function* enableMetadata(action: ReturnType<typeof doEnableMetadata.request>): Generator {
  try {
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield call(fetchMetadataEnable, projectId, action.payload);
    yield put(doEnableMetadata.success());
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doEnableMetadata.failure(error));
  }
}

function* disableMetadata(action: ReturnType<typeof doDisableMetadata.request>): Generator {
  try {
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield call(fetchMetadataDisable, projectId, action.payload);
    yield put(doDisableMetadata.success());
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doDisableMetadata.failure(error));
  }
}

function* getFieldList(action: ReturnType<typeof doGetFieldList.request>): Generator {
  try {
    const fieldListMap = yield* select((state) => state.metadata.fieldListMap);
    if (fieldListMap[action.payload.metadataCode]) {
      return;
    }
    const response = yield* call(fetchFieldList, action.payload);
    fieldListMap[action.payload.metadataCode] = response.data;
    yield put(doGetFieldList.success(fieldListMap));
  } catch (error) {
    yield put(doGetFieldList.failure(error));
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
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield call(fetchTagAdd, action.payload);
    yield put(doAddTag.success());
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doAddTag.failure(error));
  }
}

function* deleteTag(action: ReturnType<typeof doDelTag.request>): Generator {
  try {
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield call(fetchTagDel, projectId, action.payload);
    yield put(doDelTag.success());
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doDelTag.failure(error));
  }
}

function* updateTag(action: ReturnType<typeof doUpdateTag.request>): Generator {
  try {
    const projectId = yield* select((state) => state.project.projectInfo.id);
    yield call(fetchTagUpdate, action.payload);
    yield put(doUpdateTag.success());
    yield put(doGetTagList.request({ projectId, page: 1, pageSize: 1000 }));
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doUpdateTag.failure(error));
  }
}

function* batchMetadata(action: ReturnType<typeof doBatchMetadata.request>): Generator {
  try {
    yield call(fetchBatchMetadata, action.payload);
    yield put(doBatchMetadata.success());
    const metadataListParams = yield* select((state) => state.metadata.metadataListParams);
    yield put(doGetMetadataList.request(metadataListParams));
  } catch (error) {
    yield put(doBatchMetadata.failure(error));
  }
}

export default function* watchMetadata() {
  yield takeEvery(getType(doGetMetadataList.request), getMetadataList);
  yield takeEvery(getType(doGetActiveMetadataList.request), getActiveMetadataList);
  yield takeEvery(getType(doAddMetadata.request), addMetadata);
  yield takeEvery(getType(doAddMetadataByExcel.request), addMetadataByExcel);

  yield takeEvery(getType(doUpdateMetadata.request), updateMetadata);
  yield takeEvery(getType(doUpdateMetadataLog.request), updateMetadataLog);

  yield takeEvery(getType(doDeleteMetadata.request), deleteMetadata);
  yield takeEvery(getType(doEnableMetadata.request), enableMetadata);
  yield takeEvery(getType(doDisableMetadata.request), disableMetadata);

  yield takeEvery(getType(doGetFieldList.request), getFieldList);

  yield takeEvery(getType(doGetTagList.request), getTagList);
  yield takeEvery(getType(doUpdateTag.request), updateTag);
  yield takeEvery(getType(doAddTag.request), addTag);
  yield takeEvery(getType(doDelTag.request), deleteTag);

  yield takeEvery(getType(doBatchMetadata.request), batchMetadata);
}
