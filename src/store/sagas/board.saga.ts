import { doGetReportInfo } from './../actions/report.action';
import { ROUTE_PATH } from '@/constants';

import { doAppendReportToBoard, doChangeBoardGlobalDate } from './../actions/board.action';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  doGetBoardList,
  doAddBoard,
  doUpdateBoard,
  doDeleteBoard,
  doGetBoardInfo,
  doGetMyBoardList,
  doGetReportList
} from '@/store/actions';
import {
  fetchBoardList,
  fetchBoardAdd,
  fetchBoardUpdate,
  fetchBoardDel,
  fetchBoardInfo,
  fetchReportAppendToBoard,
  fetchMyBoardList
} from '@/api';
import { select, call } from '@/utils';

function* getBoardList(action: ReturnType<typeof doGetBoardList.request>): Generator {
  try {
    const response = yield* call(fetchBoardList, action.payload);
    yield put(doGetBoardList.success(response.data));
  } catch (error) {
    yield put(doGetBoardList.failure(error));
  }
}

function* getBoardInfo(action: ReturnType<typeof doGetBoardInfo.request>): Generator {
  try {
    const response = yield* call(fetchBoardInfo, action.payload);
    yield put(doGetBoardInfo.success(response.data));
  } catch (error) {
    yield put(doGetBoardInfo.failure(error));
  }
}

function* addBoard(action: ReturnType<typeof doAddBoard.request>): Generator {
  try {
    const projectId = yield* select(state => state.project.projectInfo.id);
    yield call(fetchBoardAdd, { ...action.payload, projectId });
    yield put(doAddBoard.success());
    yield put(doGetBoardList.request({ projectId, page: 1, pageSize: 1000 }));
  } catch (error) {
    yield put(doAddBoard.failure(error));
  }
}

function* updateBoard(action: ReturnType<typeof doUpdateBoard.request>): Generator {
  try {
    yield call(fetchBoardUpdate, action.payload);
    yield put(doUpdateBoard.success());
    const projectId = yield* select(state => state.project.projectInfo.id);
    yield [
      put(doGetBoardInfo.request({ id: action.payload.id, projectId })),
      put(doGetBoardList.request({ projectId, page: 1, pageSize: 1000 }))
    ];
  } catch (error) {
    yield put(doUpdateBoard.failure(error));
  }
}

function* deleteBoard(action: ReturnType<typeof doDeleteBoard.request>): Generator {
  try {
    yield call(fetchBoardDel, action.payload);
    yield put(doDeleteBoard.success());
    const projectId = yield* select(state => state.project.projectInfo.id);
    yield put(doGetBoardList.request({ projectId, page: 1, pageSize: 1000 }));
  } catch (error) {
    yield put(doDeleteBoard.failure(error));
  }
}

function* appendReportToBoard(action: ReturnType<typeof doAppendReportToBoard.request>): Generator {
  try {
    yield call(fetchReportAppendToBoard, action.payload);
    yield put(doAppendReportToBoard.success());
    const location = yield* select(state => state.router.location);
    const projectId = yield* select(state => state.project.projectInfo.id);
    if (location.pathname === ROUTE_PATH.board) {
      yield put(doGetBoardInfo.request({ projectId, id: action.payload.boardIds[0] }));
    } else if (location.pathname === ROUTE_PATH.reportList) {
      const param = yield* select(state => state.report.reportListParams);
      yield put(doGetReportList.request(param));
    } else {
      yield put(doGetReportInfo.request({ projectId, id: action.payload.reportId }));
    }
  } catch (error) {
    yield put(doAppendReportToBoard.failure(error));
  }
}

function* getMyBoardList(action: ReturnType<typeof doGetMyBoardList.request>): Generator {
  try {
    const response = yield* call(fetchMyBoardList, action.payload);
    yield put(doGetMyBoardList.success(response.data));
  } catch (error) {
    yield put(doGetMyBoardList.failure(error));
  }
}

export default function* watchBoard() {
  yield takeEvery(getType(doGetBoardList.request), getBoardList);
  yield takeEvery(getType(doGetBoardInfo.request), getBoardInfo);
  yield takeEvery(getType(doAddBoard.request), addBoard);
  yield takeEvery(getType(doUpdateBoard.request), updateBoard);
  yield takeEvery(getType(doDeleteBoard.request), deleteBoard);
  yield takeEvery(getType(doAppendReportToBoard.request), appendReportToBoard);
  yield takeEvery(getType(doGetMyBoardList.request), getMyBoardList);
}
