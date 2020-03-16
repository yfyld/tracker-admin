import { createAsyncAction, createAction } from 'typesafe-actions';
import * as actionType from '@/constants/actionType';
import {
  IEventAnalyseParam,
  IPathAnalyseParam,
  IPathAnalyseData,
  IEventAnalyseData,
  IFunnelAnalyseParam,
  IFunnelAnalyseData
} from '@/api';

export const doGetEventAnalyse = createAsyncAction(
  actionType.EVENT_ANALYSE_REQUEST,
  actionType.EVENT_ANALYSE_SUCCESS,
  actionType.EVENT_ANALYSE_FAILURE
)<IEventAnalyseParam, IEventAnalyseData, Error>();

export const doGetFunnelAnalyse = createAsyncAction(
  actionType.FUNNEL_ANALYSE_REQUEST,
  actionType.FUNNEL_ANALYSE_SUCCESS,
  actionType.FUNNEL_ANALYSE_FAILURE
)<IFunnelAnalyseParam, IFunnelAnalyseData, Error>();

export const doGetPathAnalyse = createAsyncAction(
  actionType.PATH_ANALYSE_REQUEST,
  actionType.PATH_ANALYSE_SUCCESS,
  actionType.PATH_ANALYSE_FAILURE
)<IPathAnalyseParam, IPathAnalyseData, Error>();

export const doInitAnalyse = createAction(
  actionType.INIT_ANALYSE,
  action => (param: { projectId: number; reportId: number; type?: string; param?: any }) => action(param)
);
