import update from 'immutability-helper'
import { getType } from 'typesafe-actions'
import { Action, UserInfo } from '@/types'
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
}

const initialState = (): AppState => ({
  test: 22,
  userInfo: {},
  token: '',
  loading: false,
  loadingText: '加载中',
  collapsed: false
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
