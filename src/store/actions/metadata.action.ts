import { createAsyncAction } from 'typesafe-actions'
import {  PageData } from '@/types';
import { GET_METADATA_LIST_REQUEST, GET_METADATA_LIST_SUCCESS, GET_METADATA_LIST_FAILURE } from '@/constants';
import { IMetadataListParam, IMetadataInfo } from '@/api';

export const doGetMetadataList = createAsyncAction(
  GET_METADATA_LIST_REQUEST,
  GET_METADATA_LIST_SUCCESS,
  GET_METADATA_LIST_FAILURE
)<IMetadataListParam, PageData<IMetadataInfo>, Error>()