import { doUpdateProjectMember, doDeleteProjectMember } from './../actions/project.action';
import { ROUTE_PATH } from '@/constants';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  doGetProjectList,
  doAddProject,
  doDeleteProject,
  doGetProjectInfo,
  doUpdateProject,
  doAddProjectMember
} from '@/store/actions';
import {
  fetchProjectList,
  fetchProjectAdd,
  fetchProjectDel,
  fetchProjectInfo,
  fetchProjectUpdate,
  fetchPrjectMemberAdd,
  fetchPrjectMemberUpdate,
  fetchPrjectMemberDel
} from '@/api';
import { call, select } from '@/utils';
import { message } from 'antd';

function* getProjectList(action: ReturnType<typeof doGetProjectList.request>): Generator {
  try {
    const pathname = yield* select((state) => state.router.location.pathname);
    if (pathname === ROUTE_PATH.teamInfo) {
      var teamId = yield* select((state) => state.team.teamInfo.id);
    }
    const response = yield* call(fetchProjectList, { teamId, ...action.payload });
    yield put(doGetProjectList.success(response.data));
  } catch (error) {
    yield put(doGetProjectList.failure(error));
  }
}

function* addProject(action: ReturnType<typeof doAddProject.request>): Generator {
  try {
    const pathname = yield* select((state) => state.router.location.pathname);
    if (pathname === ROUTE_PATH.teamInfo) {
      var teamId = yield* select((state) => state.team.teamInfo.id);
    }
    const response = yield* call(fetchProjectAdd, { ...action.payload, teamId });
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

function* getProjectInfo(action: ReturnType<typeof doGetProjectInfo.request>): Generator {
  try {
    const response = yield* call(fetchProjectInfo, action.payload);
    yield put(doGetProjectInfo.success(response.data));
  } catch (error) {
    yield put(doGetProjectInfo.failure(error));
  }
}

function* updateProject(action: ReturnType<typeof doUpdateProject.request>): Generator {
  try {
    yield* call(fetchProjectUpdate, action.payload);
    yield put(doUpdateProject.success());
    const projectListParams = yield* select((state) => state.project.projectListParams);
    yield put(doGetProjectList.request(projectListParams));
    yield put(doGetProjectInfo.request(action.payload.id));
    message.success('修改成功');
  } catch (error) {
    yield put(doUpdateProject.failure(error));
  }
}

function* addProjectMember(action: ReturnType<typeof doAddProjectMember.request>): Generator {
  try {
    const response = yield* call(fetchPrjectMemberAdd, action.payload);
    yield put(doAddProjectMember.success());
    yield put(doGetProjectInfo.request(action.payload.projectId));
  } catch (error) {
    yield put(doAddProjectMember.failure(error));
  }
}

function* updateProjectMember(action: ReturnType<typeof doUpdateProjectMember.request>): Generator {
  try {
    const response = yield* call(fetchPrjectMemberUpdate, action.payload);
    yield put(doUpdateProjectMember.success());
    yield put(doGetProjectInfo.request(action.payload.projectId));
  } catch (error) {
    yield put(doUpdateProjectMember.failure(error));
  }
}

function* delProjectMember(action: ReturnType<typeof doDeleteProjectMember.request>): Generator {
  try {
    const response = yield* call(fetchPrjectMemberDel, action.payload);
    yield put(doDeleteProjectMember.success());
    yield put(doGetProjectInfo.request(action.payload.projectId));
  } catch (error) {
    yield put(doDeleteProjectMember.failure(error));
  }
}

export default function* watchProject() {
  yield takeEvery(getType(doGetProjectList.request), getProjectList);
  yield takeEvery(getType(doAddProject.request), addProject);
  yield takeEvery(getType(doDeleteProject.request), deleteProject);
  yield takeEvery(getType(doGetProjectInfo.request), getProjectInfo);
  yield takeEvery(getType(doUpdateProject.request), updateProject);

  yield takeEvery(getType(doUpdateProjectMember.request), updateProjectMember);
  yield takeEvery(getType(doAddProjectMember.request), addProjectMember);
  yield takeEvery(getType(doDeleteProjectMember.request), delProjectMember);
}
