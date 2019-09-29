import { createAsyncAction } from 'typesafe-actions';
import { IPageData } from '@/types';
import * as actionType from '@/constants/actionType';
import { IMetadataListParam, IMetadataInfo, IAddMetadataParam } from '@/api';

export const doGetMetadataList = createAsyncAction(
  actionType.GET_METADATA_LIST_REQUEST,
  actionType.GET_METADATA_LIST_SUCCESS,
  actionType.GET_METADATA_LIST_FAILURE
)<IMetadataListParam, IPageData<IMetadataInfo>, Error>();

export const doAddMetadata = createAsyncAction(
  actionType.ADD_METADATA_REQUEST,
  actionType.ADD_METADATA_SUCCESS,
  actionType.ADD_METADATA_FAILURE
)<IAddMetadataParam, undefined, Error>();
