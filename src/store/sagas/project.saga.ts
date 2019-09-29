import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { doGetProjectList, doAddProject, doDeleteProject } from '@/store/actions';
import { fetchProjectList, fetchProjectAdd, fetchProjectDel } from '@/api';
import { call } from '@/utils';
import { message } from 'antd';

function* getProjectList(action: ReturnType<typeof doGetProjectList.request>): Generator {
  try {
    const response = yield* call(fetchProjectList, action.payload);
    yield put(doGetProjectList.success(response.data));
  } catch (error) {
    yield put(doGetProjectList.failure(error));
  }
}

function* addProject(action: ReturnType<typeof doAddProject.request>): Generator {
  try {
    const response = yield* call(fetchProjectAdd, action.payload);
    yield put(doAddProject.success(response.data));
    yield put(doGetProjectList.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doGetProjectList.failure(error));
  }
}

function* deleteProject(action: ReturnType<typeof doDeleteProject.request>): Generator {
  try {
    yield* call(fetchProjectDel, action.payload);
    yield put(doDeleteProject.success());
    yield put(doGetProjectList.request({ page: 1, pageSize: 20 }));
  } catch (error) {
    yield put(doDeleteProject.failure(error));
  }
}

export default function* watchProject() {
  yield takeEvery(getType(doGetProjectList.request), getProjectList);
  yield takeEvery(getType(doAddProject.request), addProject);
  yield takeEvery(getType(doDeleteProject.request), deleteProject);
}
