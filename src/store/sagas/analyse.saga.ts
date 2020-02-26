import { doGetReportInfo } from './../actions/report.action';
import { doGetEventAnalyse, doInitAnalyse, doGetFunnelAnalyse } from './../actions/analyse.action';
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

function* getFunnelAnalyseData(action: ReturnType<typeof doGetEventAnalyse.request>): Generator {
  try {
    const response = yield* call(fetchEventAnalyseData, action.payload);
    yield put(doGetEventAnalyse.success(response.data));
  } catch (error) {
    yield put(doGetEventAnalyse.failure(error));
  }
}

function* initAnalyse(action: ReturnType<typeof doInitAnalyse>): Generator {
  try {
    const eventAnalyseParam = yield* select(state => state.analyse.eventAnalyseParam);
    const { projectId, reportId } = action.payload;
    if (!action.payload.reportId) {
      yield put(doGetEventAnalyse.request({ ...eventAnalyseParam, projectId }));
    } else {
      yield put(
        doGetReportInfo.request({
          projectId,
          id: reportId
        })
      );
    }
  } catch (error) {}
}

export default function* watchAnalyse() {
  yield takeEvery(getType(doGetEventAnalyse.request), getEventAnalyseData);
  yield takeEvery(getType(doGetFunnelAnalyse.request), getFunnelAnalyseData);
  yield takeEvery(getType(doInitAnalyse), initAnalyse);
}
