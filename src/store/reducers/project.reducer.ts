import update from 'immutability-helper'
import { getType } from 'typesafe-actions'
import { Action, PageData } from '@/types'
import { doGetProjectList } from '@/store/actions';
import { IProjectInfo, IProjectListParam } from '@/api';
//import * as Api from "@/api"


export interface ProjectState {
  projectInfo: IProjectInfo
  projectList:PageData<IProjectInfo>
  getProjectListParams:IProjectListParam
}

const initialState = (): ProjectState => ({
  projectInfo:{},
  projectList:{totalCount:0,list:[]},
  getProjectListParams:{page:1,pageSize:20,role:""}
})

export const projectReducer = (
  state: ProjectState = initialState(),
  action: Action
): ProjectState => {
  switch (action.type) {
    case getType(doGetProjectList.request):
      return update(state, {getProjectListParams:{ $set: action.payload} })
    case getType(doGetProjectList.success):
      return update(state, {
        projectList: { $set: action.payload }
      })
    default:
      return state
  }
}
