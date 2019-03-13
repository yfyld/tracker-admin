import { createAsyncAction } from 'typesafe-actions'
import { GET_PROJECT_LIST_REQUEST, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_FAILURE } from '@/constants';
import { GetProjectListParams, PageData, ProjectInfo } from '@/types';

export const doGetProjectList = createAsyncAction(
  GET_PROJECT_LIST_REQUEST,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAILURE
)<GetProjectListParams, PageData<ProjectInfo>, Error>()