// import update from 'immutability-helper'
// import { getType } from 'typesafe-actions'
import { Action, PageData, EventInfo, GetEventListParams } from '@/types'

//import * as Api from "@/api"


export interface ProjectState {
  eventInfo: EventInfo
  eventList:PageData<EventInfo>
  getEventListParams:GetEventListParams
}

const initialState = (): ProjectState => ({
  eventInfo:{
    id:null,
    name:null
  },
  eventList:{totalCount:0,list:[]},
  getEventListParams:{page:1,pageSize:20}
})

export const projectReducer = (
  state: ProjectState = initialState(),
  action: Action
): ProjectState => {
  switch (action.type) {
    // case getType(doGetProjectList.request):
    //   return update(state, {getEventListParams:{ $set: action.payload} })
    // case getType(doGetProjectList.success):
    //   return update(state, {
    //     eventList: { $set: action.payload }
    //   })
    default:
      return state
  }
}
