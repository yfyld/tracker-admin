import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  DELETE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  EDIE_ROLE,
  GET_ROLE_FAILURE,
  GET_ROLE_PERMISSIONS_FAILURE,
  GET_ROLE_PERMISSIONS_REQUEST,
  GET_ROLE_PERMISSIONS_SUCCESS,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  POST_ROLE_FAILURE,
  POST_ROLE_REQUEST,
  POST_ROLE_SUCCESS,
  PUT_ROLE_FAILURE,
  PUT_ROLE_PERMISSIONS_FAILURE,
  PUT_ROLE_PERMISSIONS_REQUEST,
  PUT_ROLE_PERMISSIONS_SUCCESS,
  PUT_ROLE_REQUEST,
  PUT_ROLE_SUCCESS
} from '@/constants';
import {
  IRoleList,
  IQueryRole,
  IBaseRole,
  IRoleListItem,
  IUpdateRole,
  IUpdateRolePermissions,
  IRolePermissionList,
  IRoleInfo
} from '@/api';

export const doGetRole = createAsyncAction(GET_ROLE_REQUEST, GET_ROLE_SUCCESS, GET_ROLE_FAILURE)<
  IQueryRole,
  IRoleList,
  Error
>();

export const doPostRole = createAsyncAction(POST_ROLE_REQUEST, POST_ROLE_SUCCESS, POST_ROLE_FAILURE)<
  IBaseRole,
  IRoleListItem,
  Error
>();

export const doPutRole = createAsyncAction(PUT_ROLE_REQUEST, PUT_ROLE_SUCCESS, PUT_ROLE_FAILURE)<
  IUpdateRole,
  undefined,
  Error
>();

export const doDeleteRole = createAsyncAction(DELETE_ROLE_REQUEST, DELETE_ROLE_SUCCESS, DELETE_ROLE_FAILURE)<
  number,
  undefined,
  Error
>();

export const doGetRoleInfo = createAsyncAction(
  GET_ROLE_PERMISSIONS_REQUEST,
  GET_ROLE_PERMISSIONS_SUCCESS,
  GET_ROLE_PERMISSIONS_FAILURE
)<number, IRoleInfo, Error>();

export const doUpdateRolePermissions = createAsyncAction(
  PUT_ROLE_PERMISSIONS_REQUEST,
  PUT_ROLE_PERMISSIONS_SUCCESS,
  PUT_ROLE_PERMISSIONS_FAILURE
)<IUpdateRolePermissions, undefined, Error>();

export const doEditRole = createAction(EDIE_ROLE, (action) => (params: IUpdateRole) => action(params));

const GET_ALL_ROLE_REQUEST = 'GET_ALL_ROLE_REQUEST';
const GET_ALL_ROLE_SUCCESS = 'GET_ALL_ROLE_SUCCESS';
const GET_ALL_ROLE_FAILURE = 'GET_ALL_ROLE_FAILURE';

export const doGetAllRole = createAsyncAction(GET_ALL_ROLE_REQUEST, GET_ALL_ROLE_SUCCESS, GET_ALL_ROLE_FAILURE)<
  undefined,
  IRoleList,
  Error
>();
