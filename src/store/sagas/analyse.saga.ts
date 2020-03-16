import { doGetReportInfo } from './../actions/report.action';
import { doGetEventAnalyse, doInitAnalyse, doGetFunnelAnalyse, doGetPathAnalyse } from './../actions/analyse.action';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { select, call } from '@/utils';
import { fetchEventAnalyseData, fetchFunnelAnalyseData } from '@/api';

function* getEventAnalyseData(action: ReturnType<typeof doGetEventAnalyse.request>): Generator {
  try {
    const response = yield* call(fetchEventAnalyseData, action.payload);
    yield put(doGetEventAnalyse.success(response.data));
  } catch (error) {
    yield put(doGetEventAnalyse.failure(error));
  }
}

function* getFunnelAnalyseData(action: ReturnType<typeof doGetFunnelAnalyse.request>): Generator {
  try {
    const response = yield* call(fetchFunnelAnalyseData, action.payload);
    yield put(doGetFunnelAnalyse.success(response.data));
  } catch (error) {
    yield put(doGetFunnelAnalyse.failure(error));
  }
}

function* initAnalyse(action: ReturnType<typeof doInitAnalyse>): Generator {
  try {
    let { projectId, reportId, param, type } = action.payload;
    if (reportId && !param) {
      yield put(
        doGetReportInfo.request({
          projectId,
          id: reportId
        })
      );
      return;
    }

    switch (type) {
      case 'EVENT': {
        param = param || { ...(yield* select(state => state.analyse.eventAnalyseParam)), projectId };
        yield put(doGetEventAnalyse.request(param));
        break;
      }
      case 'FUNNEL': {
        param = param || { ...(yield* select(state => state.analyse.funnelAnalyseParam)), projectId };
        yield put(doGetFunnelAnalyse.request(param));
        break;
      }

      case 'PATH': {
        param = param || { ...(yield* select(state => state.analyse.pathAnalyseParam)), projectId };
        yield put(doGetPathAnalyse.request(param));
        break;
      }
      default:
        break;
    }
  } catch (error) {}
}

export default function* watchAnalyse() {
  yield takeEvery(getType(doGetEventAnalyse.request), getEventAnalyseData);
  yield takeEvery(getType(doGetFunnelAnalyse.request), getFunnelAnalyseData);
  yield takeEvery(getType(doInitAnalyse), initAnalyse);
}
