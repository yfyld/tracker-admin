import { IEventAnalyseData } from './../../api/analyse.api';
import { createAsyncAction, createAction } from 'typesafe-actions';
import * as actionType from '@/constants/actionType';
import { IEventAnalyseParam } from '@/api';

export const doGetEventAnalyse = createAsyncAction(
  actionType.EVENT_ANALYSE_REQUEST,
  actionType.EVENT_ANALYSE_SUCCESS,
  actionType.EVENT_ANALYSE_FAILURE
)<IEventAnalyseParam, IEventAnalyseData, Error>();

export const doInitAnalyse = createAction(
  actionType.INIT_ANALYSE,
  action => (param: { projectId: number; reportId: number }) => action(param)
);
