import { doGetProjectInfo } from './../actions/project.action';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import { doGetProjectList, doResetStore } from '@/store/actions';
import { IProjectInfo, IProjectListParam, IProjectListItem } from '@/api';
//import * as Api from "@/api"

export interface ProjectState {
  projectInfo: IProjectInfo;
  projectList: IPageData<IProjectListItem>;
  projectListParams: IProjectListParam;
}

const initialState = (): ProjectState => ({
  projectInfo: {
    id: null,
    name: '',
    image: '',
    creator: {
      nickname: ''
    },
    associationProjects: [],
    members: [],
    description: ''
  },

  projectList: { totalCount: 0, list: [] },
  projectListParams: { page: 1, pageSize: 20, projectName: '' }
});

export const projectReducer = (state: ProjectState = initialState(), action: IAction): ProjectState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doGetProjectList.request):
      return update(state, { projectListParams: { $set: action.payload } });
    case getType(doGetProjectList.success):
      return update(state, {
        projectList: { $set: action.payload }
      });
    case getType(doGetProjectInfo.success):
      return update(state, {
        projectInfo: { $set: action.payload }
      });

    default:
      return state;
  }
};
