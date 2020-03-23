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
  PUT_ROLE_FAILURE, PUT_ROLE_PERMISSIONS_FAILURE,
  PUT_ROLE_PERMISSIONS_REQUEST,
  PUT_ROLE_PERMISSIONS_SUCCESS,
  PUT_ROLE_REQUEST,
  PUT_ROLE_SUCCESS
} from '@/constants';
import {
  IRoleItemList,
  IQueryRole,
  IBaseRole,
  IRoleListItem,
  IUpdateRole,
  IRolePermission,
  IUpdateRolePermissions
} from '@/api';

export const doGetRole = createAsyncAction(GET_ROLE_REQUEST, GET_ROLE_SUCCESS, GET_ROLE_FAILURE)<
  IQueryRole,
  IRoleItemList,
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

export const doGetRolePermissions = createAsyncAction(GET_ROLE_PERMISSIONS_REQUEST, GET_ROLE_PERMISSIONS_SUCCESS, GET_ROLE_PERMISSIONS_FAILURE)<
  number,
  IRolePermission[],
  Error
  >();

export const doUpdateRolePermissions = createAsyncAction(PUT_ROLE_PERMISSIONS_REQUEST, PUT_ROLE_PERMISSIONS_SUCCESS, PUT_ROLE_PERMISSIONS_FAILURE)<
  IUpdateRolePermissions,
  undefined,
  Error
  >();

export const doEditRole = createAction(
  EDIE_ROLE,
  action => (params: IUpdateRole) => action(params)
);