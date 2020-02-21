import { getAnalysePath } from './../../utils/util';
import { ROUTE_PATH } from './../../constants/constant';
import { doGetEventAnalyse } from './../actions/analyse.action';
import { message } from 'antd';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  doGetReportList,
  doAddReport,
  doUpdateReport,
  doDeleteReport,
  doGetReportInfo,
  doGetBoardInfo
} from '@/store/actions';
import {
  fetchReportList,
  fetchReportAdd,
  fetchFieldList,
  fetchReportUpdate,
  fetchReportDel,
  fetchReportInfo
} from '@/api';
import { select, call } from '@/utils';
import { push } from 'connected-react-router';

function* getReportList(action: ReturnType<typeof doGetReportList.request>): Generator {
  try {
    const response = yield* call(fetchReportList, action.payload);
    yield put(doGetReportList.success(response.data));
  } catch (error) {
    yield put(doGetReportList.failure(error));
  }
}

function* getReportInfo(action: ReturnType<typeof doGetReportInfo.request>): Generator {
  try {
    const response = yield* call(fetchReportInfo, action.payload);
    yield put(doGetReportInfo.success(response.data));
    yield put(doGetEventAnalyse.request(response.data.data));
  } catch (error) {
    yield put(doGetReportInfo.failure(error));
  }
}

function* addReport(action: ReturnType<typeof doAddReport.request>): Generator {
  try {
    const reportListParams = yield* select(state => state.report.reportListParams);

    const projectId = yield* select(state => state.project.projectInfo.id);
    const { dateEnd, dateStart, dateType } = action.payload.data;
    const response = yield* call(fetchReportAdd, { ...action.payload, projectId, dateEnd, dateStart, dateType });
    yield put(doAddReport.success());
    yield put(doGetReportList.request(reportListParams));
    message.success('保存成功');
    const pathname = yield* select(state => state.router.location.pathname);
    if (pathname !== ROUTE_PATH.reportList) {
      yield put(push(getAnalysePath('EVENT', projectId, response.data.id)));
    }
  } catch (error) {
    yield put(doAddReport.failure(error));
  }
}

function* updateReport(action: ReturnType<typeof doUpdateReport.request>): Generator {
  try {
    const reportListParams = yield* select(state => state.report.reportListParams);
    const { dateEnd, dateStart, dateType } = action.payload.data;
    yield call(fetchReportUpdate, { ...action.payload, dateEnd, dateStart, dateType });
    yield put(doUpdateReport.success());
    yield put(doGetReportList.request(reportListParams));
    message.success('保存成功');
  } catch (error) {
    yield put(doUpdateReport.failure(error));
  }
}

function* deleteReport(action: ReturnType<typeof doDeleteReport.request>): Generator {
  try {
    const reportListParams = yield* select(state => state.report.reportListParams);
    yield call(fetchReportDel, action.payload);
    yield put(doDeleteReport.success());
    yield put(doGetReportList.request(reportListParams));
    message.success('删除成功');
  } catch (error) {
    yield put(doDeleteReport.failure(error));
  }
}

export default function* watchReport() {
  yield takeEvery(getType(doGetReportList.request), getReportList);
  yield takeEvery(getType(doAddReport.request), addReport);
  yield takeEvery(getType(doUpdateReport.request), updateReport);
  yield takeEvery(getType(doDeleteReport.request), deleteReport);
  yield takeEvery(getType(doGetReportInfo.request), getReportInfo);
}
