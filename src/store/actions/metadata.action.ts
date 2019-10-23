import { IDeleteParam } from './../../types/index';
import {
  IFieldListParam,
  IFieldInfo,
  ITagAddParam,
  ITagUpdateParam,
  ITagListParam,
  ITagList
} from './../../api/metadata.api';
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
)<IDeleteParam, undefined, Error>();

export const doUpdateTag = createAsyncAction(
  actionType.UPDATE_TAG_REQUEST,
  actionType.UPDATE_TAG_SUCCESS,
  actionType.UPDATE_TAG_FAILURE
)<ITagUpdateParam, undefined, Error>();
