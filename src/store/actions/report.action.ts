import { IFieldListParam, IFieldInfo } from '../../api/metadata.api';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { IPageData } from '@/types';
import * as actionType from '@/constants/actionType';
import { IReportListParam, IReportInfo, IReportUpdateParam, IReportAddParam } from '@/api';

export const doGetReportList = createAsyncAction(
  actionType.GET_REPORT_LIST_REQUEST,
  actionType.GET_REPORT_LIST_SUCCESS,
  actionType.GET_REPORT_LIST_FAILURE
)<IReportListParam, IPageData<IReportInfo>, Error>();

export const doResetReportInfo = createAction(actionType.RESET_REPORT_INFO, action => (type: string) => action(type));

export const doAddReport = createAsyncAction(
  actionType.ADD_REPORT_REQUEST,
  actionType.ADD_REPORT_SUCCESS,
  actionType.ADD_REPORT_FAILURE
)<IReportAddParam, undefined, Error>();

export const doUpdateReport = createAsyncAction(
  actionType.UPDATE_REPORT_REQUEST,
  actionType.UPDATE_REPORT_SUCCESS,
  actionType.UPDATE_REPORT_FAILURE
)<IReportUpdateParam, undefined, Error>();

export const doDeleteReport = createAsyncAction(
  actionType.DELETE_REPORT_REQUEST,
  actionType.DELETE_REPORT_SUCCESS,
  actionType.DELETE_REPORT_FAILURE
)<number, undefined, Error>();
