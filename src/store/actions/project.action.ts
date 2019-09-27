import { createAsyncAction } from 'typesafe-actions'
import { GET_PROJECT_LIST_REQUEST, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_FAILURE } from '@/constants';
import {  PageData } from '@/types';
import { IProjectInfo, IProjectListParam } from '@/api';

export const doGetProjectList = createAsyncAction(
  GET_PROJECT_LIST_REQUEST,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAILURE
)<IProjectListParam, PageData<IProjectInfo>, Error>()