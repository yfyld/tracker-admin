import update from 'immutability-helper'
import { getType } from 'typesafe-actions'
import { Action, UserInfo, MenuItem } from '@/types'
//import * as Api from "@/api"

import {
  doLogin,
  doChangeLoadingStatus,
  doResetStore,
  doGetUserInfo,
  doChangeCollapsed
} from '@/store/actions'



export interface AppState {
  test: number
  userInfo: UserInfo
  token: string
  loading: boolean
  loadingText: string
  collapsed: boolean
  menuData:MenuItem[]
}

const initialState = (): AppState => ({
  test: 22,
  userInfo: {},
  token: '',
  loading: false,
  loadingText: '加载中',
  collapsed: false,
  menuData:[{
    key:"/project/1/info",
    name:"项目信息",
    icon:"setting",
    auth:["admin"]
  },{
    key:"broad",
    name:"数据看板",
    icon:"setting",
    children:[
      {
        key:"/project/1/board/1",
        icon:"setting",
        name:"老板看板"
      }
    ]
  },{
    key:"analyse",
    name:"行为分析",
    auth:["dev","admin"],
    icon:"setting",
    children:[
      {
        key:"/project/1/analyse-event",
        icon:"setting",
        name:"事件分析"
      }
    ]
  },{
    key:"/project/1/metadata-list",
    name:"元数据",
    icon:"setting",
    auth:["admin"]
  },{
    key:"http://www.baidu.com",
    name:"自定义查询",
    icon:"setting",
    auth:["admin"]
  }]
})

export const appReducer = (
  state: AppState = initialState(),
  action: Action
): AppState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() })
    case getType(doLogin.request):
      return update(state, { $set: initialState() })
    case getType(doLogin.success):
      return update(state, {
        token: { $set: action.payload.token }
      })

    case getType(doChangeCollapsed):
      return update(state, {
        collapsed: { $set: action.payload }
      })

    case getType(doGetUserInfo.success):
      return update(state, {
        userInfo: { $set: action.payload }
      })
    case getType(doChangeLoadingStatus):
      return update(state, {
        loading: { $set: action.payload.status },
        loadingText: {
          $apply: () => {
            switch (action.payload.type) {
              case 'GET':
                return '加载中'
                break
              case 'DELETE':
                return '删除中'
                break
              default:
                return '提交中'
                break
            }
          }
        }
      })

    default:
      return state
  }
}
