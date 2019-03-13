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
} from '@/constants'
import { createAsyncAction, createAction } from 'typesafe-actions'
import { LoginParams, UserInfo, SignupParams } from '@/types'

export const doAppInit = createAsyncAction(
  APP_INIT_REQUEST,
  APP_INIT_SUCCESS,
  APP_INIT_FAILURE
)<undefined, undefined, Error>()

export const doLogin = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<LoginParams, { token: string }, Error>()

export const doGetUserInfo = createAsyncAction(
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE
)<undefined, UserInfo, Error>()

export const doSignup = createAsyncAction(
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
)<SignupParams, any, Error>()

export const doChangeLoadingStatus = createAction(
  CHANGE_LOADING_STATUS,
  action => (status: boolean, type: string) => action({ status, type })
)


export const doResetStore=createAction(RESET_STORE)

export const doChangeCollapsed=createAction(CHANGE_COLLAPSED,action=>(collapsed:boolean)=>action(collapsed))