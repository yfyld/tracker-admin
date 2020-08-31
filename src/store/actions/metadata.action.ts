import { IFieldListMap } from './../reducers/metadata.reducer';
import { IDeleteParam, IListData, IInfoParam } from './../../types/index';
import {
  IFieldInfo,
  ITagAddParam,
  ITagUpdateParam,
  ITagListParam,
  ITagList,
  IMetadataAddByExcelParam,
  IFieldListParam,
  IBatchMetadataParam
} from './../../api/metadata.api';
import { createAsyncAction } from 'typesafe-actions';
import { IPageData } from '@/types';
import * as actionType from '@/constants/actionType';
import { IMetadataListParam, IMetadataInfo, IMetadataAddParam, IMetadataUpdateParam } from '@/api';

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

export const doAddMetadataByExcel = createAsyncAction(
  actionType.ADD_METADATA_BY_EXCEL_REQUEST,
  actionType.ADD_METADATA_BY_EXCEL_SUCCESS,
  actionType.ADD_METADATA_BY_EXCEL_FAILURE
)<IMetadataAddByExcelParam, undefined, Error>();

export const doUpdateMetadata = createAsyncAction(
  actionType.UPDATE_METADATA_REQUEST,
  actionType.UPDATE_METADATA_SUCCESS,
  actionType.UPDATE_METADATA_FAILURE
)<IMetadataUpdateParam, undefined, Error>();

export const doUpdateMetadataLog = createAsyncAction(
  actionType.UPDATE_METADATA_LOG_REQUEST,
  actionType.UPDATE_METADATA_LOG_SUCCESS,
  actionType.UPDATE_METADATA_LOG_FAILURE
)<IInfoParam, undefined, Error>();

export const doDeleteMetadata = createAsyncAction(
  actionType.DELETE_METADATA_REQUEST,
  actionType.DELETE_METADATA_SUCCESS,
  actionType.DELETE_METADATA_FAILURE
)<number, undefined, Error>();

export const doEnableMetadata = createAsyncAction(
  actionType.ENABLE_METADATA_REQUEST,
  actionType.ENABLE_METADATA_SUCCESS,
  actionType.ENABLE_METADATA_FAILURE
)<number, undefined, Error>();

export const doDisableMetadata = createAsyncAction(
  actionType.DISABLE_METADATA_REQUEST,
  actionType.DISABLE_METADATA_SUCCESS,
  actionType.DISABLE_METADATA_FAILURE
)<number, undefined, Error>();

export const doGetActiveMetadataList = createAsyncAction(
  actionType.GET_ACTIVE_METADATA_LIST_REQUEST,
  actionType.GET_ACTIVE_METADATA_LIST_SUCCESS,
  actionType.GET_ACTIVE_METADATA_LIST_FAILURE
)<IMetadataListParam, IPageData<IMetadataInfo>, Error>();

export const doGetFieldList = createAsyncAction(
  actionType.GET_FIELD_LIST_REQUEST,
  actionType.GET_FIELD_LIST_SUCCESS,
  actionType.GET_FIELD_LIST_FAILURE
)<IFieldListParam, IFieldListMap, Error>();

export const doGetTagList = createAsyncAction(
  actionType.GET_TAG_LIST_REQUEST,
  actionType.GET_TAG_LIST_SUCCESS,
  actionType.GET_TAG_LIST_FAILURE
)<ITagListParam, ITagList, Error>();

export const doAddTag = createAsyncAction(
  actionType.ADD_TAG_REQUEST,
  actionType.ADD_TAG_SUCCESS,
  actionType.ADD_TAG_FAILURE
)<ITagAddParam, undefined, Error>();

export const doDelTag = createAsyncAction(
  actionType.DELETE_TAG_REQUEST,
  actionType.DELETE_TAG_SUCCESS,
  actionType.DELETE_TAG_FAILURE
)<number, undefined, Error>();

export const doUpdateTag = createAsyncAction(
  actionType.UPDATE_TAG_REQUEST,
  actionType.UPDATE_TAG_SUCCESS,
  actionType.UPDATE_TAG_FAILURE
)<ITagUpdateParam, undefined, Error>();

export const doBatchMetadata = createAsyncAction(
  actionType.BATCH_METADATA_REQUEST,
  actionType.BATCH_METADATA_SUCCESS,
  actionType.BATCH_METADATA_FAILURE
)<IBatchMetadataParam, undefined, Error>();
