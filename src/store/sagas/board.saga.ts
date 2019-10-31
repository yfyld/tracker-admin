import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { doGetBoardList, doAddBoard, doUpdateBoard, doDeleteBoard, doGetBoardInfo } from '@/store/actions';
import { fetchBoardList, fetchBoardAdd, fetchBoardUpdate, fetchBoardDel, fetchBoardInfo } from '@/api';
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
    yield put(doGetBoardList.request({ projectId, page: 1, pageSize: 1000 }));
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

export default function* watchBoard() {
  yield takeEvery(getType(doGetBoardList.request), getBoardList);
  yield takeEvery(getType(doGetBoardInfo.request), getBoardInfo);
  yield takeEvery(getType(doAddBoard.request), addBoard);
  yield takeEvery(getType(doUpdateBoard.request), updateBoard);
  yield takeEvery(getType(doDeleteBoard.request), deleteBoard);
}
