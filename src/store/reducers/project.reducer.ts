import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { Action, IPageData } from '@/types';
import { doGetProjectList } from '@/store/actions';
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
    description: ''
  },
  projectList: { totalCount: 0, list: [] },
  projectListParams: { page: 1, pageSize: 20, name: '' }
});

export const projectReducer = (state: ProjectState = initialState(), action: Action): ProjectState => {
  switch (action.type) {
    case getType(doGetProjectList.request):
      return update(state, { projectListParams: { $set: action.payload } });
    case getType(doGetProjectList.success):
      return update(state, {
        projectList: { $set: action.payload }
      });
    default:
      return state;
  }
};
