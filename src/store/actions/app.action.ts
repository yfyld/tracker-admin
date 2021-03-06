import { IUserInfo, ILoginRes, ILoginParam, ISignupParam } from '@/api';
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
  CHANGE_COLLAPSED
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

//export const doRouterPush=createAction(CHANGE_COLLAPSED,action=>(path:string)=>action(path))
