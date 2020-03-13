import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
  PUT_USER_REQUEST,
  PUT_USER_SUCCESS,
  PUT_USER_FAILURE,
  GET_USER_ROLES_REQUEST,
  GET_USER_ROLES_SUCCESS,
  GET_USER_ROLES_FAILURE,
  PUT_USER_ROLES_REQUEST,
  PUT_USER_ROLES_SUCCESS,
  PUT_USER_ROLES_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS, DELETE_USER_FAILURE, EDIE_ROLE
} from './../../constants/actionType';
import { IBaseUser, IUpdateUserRoles, IUserList, IUserRole } from './../../api/app.api';
import { IUserInfo, ILoginRes, ILoginParam, ISignupParam, IUserListParam, IUpdateRole } from '@/api';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CHANGE_LOADING_STATUS,
  APP_INIT_REQUEST,
  APP_INIT_SUCCESS,
  APP_INIT_FAILURE,
  RESET_STORE,
  CHANGE_COLLAPSED,
  EDIE_USER
} from '@/constants';
import { createAsyncAction, createAction } from 'typesafe-actions';

export const doAppInit = createAsyncAction(APP_INIT_REQUEST, APP_INIT_SUCCESS, APP_INIT_FAILURE)<
  undefined,
  undefined,
  Error
>();

export const doLogin = createAsyncAction(LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE)<ILoginParam, ILoginRes, Error>();

export const doGetUserInfo = createAsyncAction(GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE)<
  undefined,
  IUserInfo,
  Error
>();

export const doSignup = createAsyncAction(SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE)<ISignupParam, any, Error>();

export const doChangeLoadingStatus = createAction(CHANGE_LOADING_STATUS, action => (status: boolean, type: string) =>
  action({ status, type })
);

export const doResetStore = createAction(RESET_STORE);

export const doChangeCollapsed = createAction(CHANGE_COLLAPSED, action => (collapsed: boolean) => action(collapsed));

export const doGetUserList = createAsyncAction(GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE)<
  IUserListParam,
  IUserList,
  Error
>();

export const doPutUser = createAsyncAction(PUT_USER_REQUEST, PUT_USER_SUCCESS, PUT_USER_FAILURE)<
  IBaseUser,
  undefined,
  Error
  >();

export const doGetUserRoles = createAsyncAction(GET_USER_ROLES_REQUEST, GET_USER_ROLES_SUCCESS, GET_USER_ROLES_FAILURE)<
  number,
  IUserRole[],
  Error
  >();

export const doPutUserRoles = createAsyncAction(PUT_USER_ROLES_REQUEST, PUT_USER_ROLES_SUCCESS, PUT_USER_ROLES_FAILURE)<
  IUpdateUserRoles,
  undefined,
  Error
  >();

export const doDeleteUser = createAsyncAction(DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE)<
  number,
  undefined,
  Error
  >();

export const doEditUser = createAction(
  EDIE_USER,
  action => (params: IBaseUser) => action(params)
);
//export const doRouterPush=createAction(CHANGE_COLLAPSED,action=>(path:string)=>action(path))
