import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  DELETE_PERMISSION_FAILURE,
  DELETE_PERMISSION_REQUEST, DELETE_PERMISSION_SUCCESS, EDIE_PERMISSION,
  GET_PERMISSION_FAILURE,
  GET_PERMISSION_REQUEST,
  GET_PERMISSION_SUCCESS,
  POST_PERMISSION_FAILURE,
  POST_PERMISSION_REQUEST,
  POST_PERMISSION_SUCCESS, PUT_PERMISSION_FAILURE, PUT_PERMISSION_REQUEST, PUT_PERMISSION_SUCCESS
} from '@/constants';
import { IPermissionItemList, IQueryPermission, IBasePermission, IPermissionListItem, IUpdatePermission } from '@/api';

export const doGetPermission = createAsyncAction(GET_PERMISSION_REQUEST, GET_PERMISSION_SUCCESS, GET_PERMISSION_FAILURE)<
  IQueryPermission,
  IPermissionItemList,
  Error
>();

export const doPostPermission = createAsyncAction(POST_PERMISSION_REQUEST, POST_PERMISSION_SUCCESS, POST_PERMISSION_FAILURE)<
  IBasePermission,
  IPermissionListItem,
  Error
>();

export const doPutPermission = createAsyncAction(PUT_PERMISSION_REQUEST, PUT_PERMISSION_SUCCESS, PUT_PERMISSION_FAILURE)<
  IUpdatePermission,
  undefined,
  Error
>();

export const doDeletePermission = createAsyncAction(DELETE_PERMISSION_REQUEST, DELETE_PERMISSION_SUCCESS, DELETE_PERMISSION_FAILURE)<
  number,
  undefined,
  Error
>();

export const doEditPermission = createAction(
  EDIE_PERMISSION,
  action => (params: IUpdatePermission) => action(params)
);