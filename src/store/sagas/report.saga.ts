import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { doGetReportList, doAddReport, doUpdateReport, doDeleteReport, doGetReportInfo } from '@/store/actions';
import {
  fetchReportList,
  fetchReportAdd,
  fetchFieldList,
  fetchActiveFieldList,
  fetchReportUpdate,
  fetchReportDel,
  fetchReportInfo
} from '@/api';
import { select, call } from '@/utils';

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
  } catch (error) {
    yield put(doGetReportInfo.failure(error));
  }
}

function* addReport(action: ReturnType<typeof doAddReport.request>): Generator {
  try {
    const metadataListParams = yield* select(state => state.metadata.metadataListParams);
    const projectId = yield* select(state => state.project.projectInfo.id);
    yield call(fetchReportAdd, { ...action.payload, projectId });
    yield put(doAddReport.success());
    yield put(doGetReportList.request(metadataListParams));
  } catch (error) {
    yield put(doAddReport.failure(error));
  }
}

function* updateReport(action: ReturnType<typeof doUpdateReport.request>): Generator {
  try {
    const metadataListParams = yield* select(state => state.metadata.metadataListParams);
    yield call(fetchReportUpdate, action.payload);
    yield put(doUpdateReport.success());
    yield put(doGetReportList.request(metadataListParams));
  } catch (error) {
    yield put(doUpdateReport.failure(error));
  }
}

function* deleteReport(action: ReturnType<typeof doDeleteReport.request>): Generator {
  try {
    const metadataListParams = yield* select(state => state.metadata.metadataListParams);
    yield call(fetchReportDel, action.payload);
    yield put(doDeleteReport.success());
    yield put(doGetReportList.request(metadataListParams));
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
