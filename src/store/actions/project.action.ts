import { IProjectListItem } from './../../api/project.api';
import * as actionType from '@/constants/actionType';
import { createAsyncAction } from 'typesafe-actions';
import { IPageData } from '@/types';
import { IProjectListParam, IAddProject, IProjectAddRes, IProjectInfo, IProjectUpdateParam } from '@/api';

export const doGetProjectList = createAsyncAction(
  actionType.GET_PROJECT_LIST_REQUEST,
  actionType.GET_PROJECT_LIST_SUCCESS,
  actionType.GET_PROJECT_LIST_FAILURE
)<IProjectListParam, IPageData<IProjectListItem>, Error>();

export const doAddProject = createAsyncAction(
  actionType.ADD_PROJECT_REQUEST,
  actionType.ADD_PROJECT_SUCCESS,
  actionType.ADD_PROJECT_FAILURE
)<IAddProject, IProjectAddRes, Error>();

export const doDeleteProject = createAsyncAction(
  actionType.DELETE_PROJECT_REQUEST,
  actionType.DELETE_PROJECT_SUCCESS,
  actionType.DELETE_PROJECT_FAILURE
)<number, undefined, Error>();

export const doGetProjectInfo = createAsyncAction(
  actionType.GET_PROJECT_REQUEST,
  actionType.GET_PROJECT_SUCCESS,
  actionType.GET_PROJECT_FAILURE
)<number, IProjectInfo, Error>();

export const doUpdateProject = createAsyncAction(
  actionType.UPDATE_PROJECT_REQUEST,
  actionType.UPDATE_PROJECT_SUCCESS,
  actionType.UPDATE_PROJECT_FAILURE
)<IProjectUpdateParam, undefined, Error>();
