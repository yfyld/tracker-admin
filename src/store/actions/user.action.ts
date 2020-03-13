import { IInfoParam } from './../../types/index';
import { IFieldInfo } from '../../api/metadata.api';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { IPageData } from '@/types';
import * as actionType from '@/constants/actionType';
import { ITeamListParam, ITeamInfo, ITeamUpdateParam, ITeamAddParam, ITeamList, ITeamInfoParam } from '@/api';

export const doGetTeamList = createAsyncAction(
  actionType.GET_TEAM_LIST_REQUEST,
  actionType.GET_TEAM_LIST_SUCCESS,
  actionType.GET_TEAM_LIST_FAILURE
)<ITeamListParam, ITeamList, Error>();

export const doGetTeamInfo = createAsyncAction(
  actionType.GET_TEAM_INFO_REQUEST,
  actionType.GET_TEAM_INFO_SUCCESS,
  actionType.GET_TEAM_INFO_FAILURE
)<ITeamInfoParam, ITeamInfo, Error>();

//export const doResetTeamInfo = createAction(actionType.RESET_TEAM_INFO, action => (type: string) => action(type));

export const doAddTeam = createAsyncAction(
  actionType.ADD_TEAM_REQUEST,
  actionType.ADD_TEAM_SUCCESS,
  actionType.ADD_TEAM_FAILURE
)<ITeamAddParam, undefined, Error>();

export const doUpdateTeam = createAsyncAction(
  actionType.UPDATE_TEAM_REQUEST,
  actionType.UPDATE_TEAM_SUCCESS,
  actionType.UPDATE_TEAM_FAILURE
)<ITeamUpdateParam, undefined, Error>();

export const doDeleteTeam = createAsyncAction(
  actionType.DELETE_TEAM_REQUEST,
  actionType.DELETE_TEAM_SUCCESS,
  actionType.DELETE_TEAM_FAILURE
)<number, undefined, Error>();
