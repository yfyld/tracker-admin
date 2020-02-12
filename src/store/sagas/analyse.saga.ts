import { doGetEventAnalyse } from './../actions/analyse.action';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { select, call } from '@/utils';
import { fetchEventAnalyseData } from '@/api';

function* getEventAnalyseData(action: ReturnType<typeof doGetEventAnalyse.request>): Generator {
  try {
    const response = yield* call(fetchEventAnalyseData, action.payload);
    yield put(doGetEventAnalyse.success(response.data));
  } catch (error) {
    yield put(doGetEventAnalyse.failure(error));
  }
}

export default function* watchAnalyse() {
  yield takeEvery(getType(doGetEventAnalyse.request), getEventAnalyseData);
}
