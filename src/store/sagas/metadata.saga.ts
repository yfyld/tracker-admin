import { put, call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { doGetMetadataList, doAddMetadata } from '@/store/actions';
import { fetchMetadataList, fetchMetadataAdd } from '@/api';
import { select } from '@/utils';

function* getMetadataList(action: ReturnType<typeof doGetMetadataList.request>): Generator {
  try {
    const response: any = yield call(fetchMetadataList, action.payload);
    yield put(doGetMetadataList.success(response.data));
  } catch (error) {
    yield put(doGetMetadataList.failure(error));
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

export default function* watchMetadata() {
  yield takeEvery(getType(doGetMetadataList.request), getMetadataList);

  yield takeEvery(getType(doAddMetadata.request), addMetadata);
}
