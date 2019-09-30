import { IFieldListParam, IFieldInfo } from './../../api/metadata.api';
import { createAsyncAction } from 'typesafe-actions';
import { IPageData } from '@/types';
import * as actionType from '@/constants/actionType';
import { IMetadataListParam, IMetadataInfo, IMetadataAddParam } from '@/api';

export const doGetMetadataList = createAsyncAction(
  actionType.GET_METADATA_LIST_REQUEST,
  actionType.GET_METADATA_LIST_SUCCESS,
  actionType.GET_METADATA_LIST_FAILURE
)<IMetadataListParam, IPageData<IMetadataInfo>, Error>();

export const doAddMetadata = createAsyncAction(
  actionType.ADD_METADATA_REQUEST,
  actionType.ADD_METADATA_SUCCESS,
  actionType.ADD_METADATA_FAILURE
)<IMetadataAddParam, undefined, Error>();

export const doGetActiveMetadataList = createAsyncAction(
  actionType.GET_ACTIVE_METADATA_LIST_REQUEST,
  actionType.GET_ACTIVE_METADATA_LIST_SUCCESS,
  actionType.GET_ACTIVE_METADATA_LIST_FAILURE
)<IMetadataListParam, IPageData<IMetadataInfo>, Error>();

export const doGetFieldList = createAsyncAction(
  actionType.GET_FIELD_LIST_REQUEST,
  actionType.GET_FIELD_LIST_SUCCESS,
  actionType.GET_FIELD_LIST_FAILURE
)<IFieldListParam, IPageData<IFieldInfo>, Error>();

export const doGetActiveFieldList = createAsyncAction(
  actionType.GET_ACTIVE_FIELD_LIST_REQUEST,
  actionType.GET_ACTIVE_FIELD_LIST_SUCCESS,
  actionType.GET_ACTIVE_FIELD_LIST_FAILURE
)<IFieldListParam, IPageData<IFieldInfo>, Error>();
