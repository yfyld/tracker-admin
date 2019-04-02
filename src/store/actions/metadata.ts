import { createAsyncAction } from 'typesafe-actions'
import {  PageData, GetMetadataListParams, MetadataInfo } from '@/types';
import { GET_METADATA_LIST_REQUEST, GET_METADATA_LIST_SUCCESS, GET_METADATA_LIST_FAILURE } from '@/constants';

export const doGetMetadataList = createAsyncAction(
  GET_METADATA_LIST_REQUEST,
  GET_METADATA_LIST_SUCCESS,
  GET_METADATA_LIST_FAILURE
)<GetMetadataListParams, PageData<MetadataInfo>, Error>()