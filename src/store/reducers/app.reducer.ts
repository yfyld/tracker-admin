import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IMenuItem } from '@/types';
//import * as Api from "@/api"

import { doLogin, doChangeLoadingStatus, doResetStore, doGetUserInfo, doChangeCollapsed } from '@/store/actions';
import { ADD_BROAD } from '@/constants';
import { IUserInfo } from '@/api';

export interface AppState {
  test: number;
  userInfo: IUserInfo;
  token: string;
  loading: boolean;
  loadingText: string;
  collapsed: boolean;
}

const initialState = (): AppState => ({
  test: 22,
  userInfo: {
    id: null,
    username: ''
  },
  token: '',
  loading: false,
  loadingText: '加载中',
  collapsed: false
});

export const appReducer = (state: AppState = initialState(), action: IAction): AppState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doLogin.request):
      return update(state, { $set: initialState() });
    case getType(doLogin.success):
      return update(state, {
        token: { $set: action.payload.accessToken }
      });

    case getType(doChangeCollapsed):
      return update(state, {
        collapsed: { $set: action.payload }
      });

    case getType(doGetUserInfo.success):
      return update(state, {
        userInfo: { $set: action.payload }
      });
    case getType(doChangeLoadingStatus):
      return update(state, {
        loading: { $set: action.payload.status },
        loadingText: {
          $apply: () => {
            switch (action.payload.type) {
              case 'GET':
                return '加载中';
              case 'DELETE':
                return '删除中';
              default:
                return '提交中';
            }
          }
        }
      });

    default:
      return state;
  }
};
