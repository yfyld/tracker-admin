import { doEditUser, doGetUserList, doGetUserRoles, doSignup } from './../actions/app.action';
import { IUpdateUserRoles, IUserList, IUserListParam, IUserRole, IBaseUser } from './../../api/app.api';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IMenuItem } from '@/types';
//import * as Api from "@/api"

import {
  doLogin,
  doChangeLoadingStatus,
  doResetStore,
  doGetUserInfo,
  doChangeCollapsed,
  doEditRole,
  doPutUser,
  doEditPermission
} from '@/store/actions';
import { ADD_BROAD } from '@/constants';
import { IUserInfo } from '@/api';

export interface AppState {
  test: number;
  userInfo: IUserInfo;
  userList: IUserList;
  token: string;
  loading: boolean;
  loadingText: string;
  collapsed: boolean;
  userListParams: IUserListParam;
  userRoles: IUserRole[];
}

const initialState = (): AppState => ({
  test: 22,
  userInfo: {
    id: null,
    username: ''
  },
  userList: {
    totalCount: 0,
    list: []
  },
  token: '',
  loading: false,
  loadingText: '加载中',
  collapsed: false,
  userListParams: { page: 1, pageSize: 20, nickname: '', username: '' },
  userRoles: []
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

    case getType(doGetUserList.request):
      return update(state, {
        userListParams: { $set: action.payload }
      });
    case getType(doGetUserList.success):
      return update(state, {
        userList: { $set: action.payload }
      });
    case getType(doGetUserRoles.success):
      return update(state, {
        userRoles: { $set: action.payload }
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
