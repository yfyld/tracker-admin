import { IDeleteParam, IPageQuery, IListData } from './../types/index';
import fetch from './http';
import { IPageData } from '@/types';

export enum IMetadataType {
  page = 1, // 页面
  event = 2 // 事件
}

export interface IMetadataInfo {
  id: number;
  name: string;
  code: string;
  type: number;
  description: string;
  status: number;
  tags: ITagInfo[];
  projectId: number;
  log: number;
  recentLog: number;
}

export interface IMetadataListParam extends IPageQuery {
  tags?: string;
  status?: number;
  name?: string;
  code?: string;
  type?: string;
  log?: number;
  projectId: number;
}

export interface IMetadataAddParam {
  code: string;
  name: string;
  type: IMetadataType;
  description?: string;
  tags?: number[];
  newTags?: string[];
  projectId: number;
}

export interface IMetadataUpdateParam {
  id: number;
  name: string;
  code: string;
  type: IMetadataType;
  description?: string;
  status: number;
  tags?: number[];
  newTags?: string[];
  projectId: number;
}

export interface ITagListParam extends IPageQuery {
  projectId: number;
}

export interface ITagInfo {
  id: number;
  name: string;
  description: string;
  projectId: number;
}

export type ITagList = IPageData<ITagInfo>;

export interface ITagAddParam {
  name: string;
  description?: string;
  projectId: number;
}

export interface ITagUpdateParam {
  id: number;
  description: string;
  name: string;
  projectId: number;
}

export interface IFieldInfo {
  name: string;
  value: string;
  type: string;
  recommend: string[];
}

export function fetchMetadataList(params: IMetadataListParam) {
  return fetch.get<IPageData<IMetadataInfo>>('/metadata/', params);
}

export function fetchMetadataAdd(params: IMetadataAddParam) {
  return fetch.post('/metadata/', params);
}

export function fetchMetadataUpdate(params: IMetadataUpdateParam) {
  return fetch.put('/metadata/', params);
}

export function fetchMetadataDelete(metadataId: number) {
  return fetch.delete(`/metadata/${metadataId}`);
}

export function fetchMetadataEnable(metadataId: number) {
  return fetch.put(`/metadata/enable/${metadataId}`);
}

export function fetchMetadataDisable(metadataId: number) {
  return fetch.put(`/metadata/disable/${metadataId}`);
}

export function fetchTagList(params: ITagListParam) {
  return fetch.get<ITagList>('/metadata/tag', params);
}

export function fetchTagAdd(params: ITagAddParam) {
  return fetch.post('/metadata/tag', params);
}

export function fetchTagDel(params: IDeleteParam) {
  return fetch.delete('/metadata/tag', params);
}

export function fetchTagUpdate(params: ITagUpdateParam) {
  return fetch.put('/metadata/tag', params);
}

export function fetchFieldList() {
  return fetch.get<IListData<IFieldInfo>>('/metadata/fields');
}
