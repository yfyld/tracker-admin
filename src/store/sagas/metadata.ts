
import { put, call ,takeEvery} from 'redux-saga/effects'
import {  getType } from 'typesafe-actions';
import { doGetMetadataList } from '@/store/actions'
import { fetchMetadataList } from '@/api';




function* getMetadataList(action: ReturnType<typeof doGetMetadataList.request>): Generator {
  try {
    const response: any = yield call(fetchMetadataList,action.payload)
    yield put(doGetMetadataList.success(response.data))
  } catch (error) {
    yield put(doGetMetadataList.failure(error))
  } 
}

export default function* watchMetadata(){
  yield takeEvery(getType(doGetMetadataList.request), getMetadataList);
}