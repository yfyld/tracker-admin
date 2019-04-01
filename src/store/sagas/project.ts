
import { put, call ,takeEvery} from 'redux-saga/effects'
import {  getType } from 'typesafe-actions';
import { doGetProjectList } from '@/store/actions'
import { fetchProjectList } from '@/api'



function* getUserInfo(action: ReturnType<typeof doGetProjectList.request>): Generator {
  try {
    const response: any = yield call(fetchProjectList,action.payload)
    yield put(doGetProjectList.success(response.data))
  } catch (error) {
    yield put(doGetProjectList.failure(error))
  } 
}

export default function* watchProject(){
  yield takeEvery(getType(doGetProjectList.request), getUserInfo);
}