import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { doGetTeamList, doAddTeam, doUpdateTeam, doDeleteTeam, doGetTeamInfo, doGetBoardInfo } from '@/store/actions';
import {
  fetchTeamList,
  fetchTeamAdd,
  fetchFieldList,
  fetchActiveFieldList,
  fetchTeamUpdate,
  fetchTeamDel,
  fetchTeamInfo
} from '@/api';
import { select, call } from '@/utils';

function* getTeamList(action: ReturnType<typeof doGetTeamList.request>): Generator {
  try {
    const response = yield* call(fetchTeamList, action.payload);
    yield put(doGetTeamList.success(response.data));
  } catch (error) {
    yield put(doGetTeamList.failure(error));
  }
}

function* getTeamInfo(action: ReturnType<typeof doGetTeamInfo.request>): Generator {
  try {
    const response = yield* call(fetchTeamInfo, action.payload);
    yield put(doGetTeamInfo.success(response.data));
  } catch (error) {
    yield put(doGetTeamInfo.failure(error));
  }
}

function* addTeam(action: ReturnType<typeof doAddTeam.request>): Generator {
  try {
    const teamListParam = yield* select(state => state.team.teamListParam);
    yield call(fetchTeamAdd, action.payload);
    yield put(doAddTeam.success());
    yield put(doGetTeamList.request(teamListParam));
  } catch (error) {
    yield put(doAddTeam.failure(error));
  }
}

function* updateTeam(action: ReturnType<typeof doUpdateTeam.request>): Generator {
  try {
    const teamListParam = yield* select(state => state.team.teamListParam);
    yield call(fetchTeamUpdate, action.payload);
    yield put(doUpdateTeam.success());
    yield put(doGetTeamList.request(teamListParam));
  } catch (error) {
    yield put(doUpdateTeam.failure(error));
  }
}

function* deleteTeam(action: ReturnType<typeof doDeleteTeam.request>): Generator {
  try {
    const teamListParam = yield* select(state => state.team.teamListParam);
    teamListParam.page = 1;
    yield call(fetchTeamDel, action.payload);
    yield put(doDeleteTeam.success());
    yield put(doGetTeamList.request(teamListParam));
  } catch (error) {
    yield put(doDeleteTeam.failure(error));
  }
}

export default function* watchTeam() {
  yield takeEvery(getType(doGetTeamList.request), getTeamList);
  yield takeEvery(getType(doAddTeam.request), addTeam);
  yield takeEvery(getType(doUpdateTeam.request), updateTeam);
  yield takeEvery(getType(doDeleteTeam.request), deleteTeam);
  yield takeEvery(getType(doGetTeamInfo.request), getTeamInfo);
}
