import { IDeleteParam, IPageQuery, IListData } from './../types/index';
import fetch from './http';
import { IPageData } from '@/types';

export enum EMetadataType {
  page = 1, // 页面
  event = 2 // 事件
}

export interface IMetadataInfo {
  id: number;
  name: string;
  code: string;
  type: EMetadataType;
  description: string;
  status: number;
  tags: ITagInfo[];
  projectId: number;
  log: number;
  recentLog: number;
  url?: string;
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
  type: EMetadataType;
  description?: string;
  tags?: number[];
  newTags?: string[];
  status: number;
  log: number;
  projectId: number;
}

export interface IMetadataUpdateParam {
  id: number;
  name: string;
  code: string;
  type: EMetadataType;
  description?: string;
  status: number;
  log: number;
  tags?: number[];
  newTags?: string[];
  projectId: number;
  url?: string;
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

export interface IMetadataAddByExcelParam {
  url?: string;
  path?: string;
  projectId: number;
}

export function fetchMetadataList(params: IMetadataListParam) {
  return fetch.get<IPageData<IMetadataInfo>>('/metadata/', params);
}

export function fetchMetadataAddByExcel(params: IMetadataAddByExcelParam) {
  return fetch.post('/metadata/upload', params);
}

export function fetchMetadataAdd(params: IMetadataAddParam) {
  return fetch.post('/metadata/', params);
}

export function fetchMetadataUpdate(params: IMetadataUpdateParam) {
  return fetch.put('/metadata/', params);
}

export function fetchMetadataDelete(projectId: number, metadataId: number) {
  return fetch.delete(`/metadata/${projectId}/${metadataId}`);
}

export function fetchMetadataEnable(projectId: number, metadataId: number) {
  return fetch.put(`/metadata/enable/${projectId}/${metadataId}`);
}

export function fetchMetadataDisable(projectId: number, metadataId: number) {
  return fetch.put(`/metadata/disable/${projectId}/${metadataId}`);
}

export function fetchTagList(params: ITagListParam) {
  return fetch.get<ITagList>('/metadata/tag', params);
}

export function fetchTagAdd(params: ITagAddParam) {
  return fetch.post('/metadata/tag', params);
}

export function fetchTagUpdate(params: ITagUpdateParam) {
  return fetch.put('/metadata/tag', params);
}

export function fetchTagDel(projectId: number, tagId: number) {
  return fetch.delete(`/metadata/tag/${projectId}/${tagId}`);
}

export function fetchFieldList() {
  return fetch.get<IPageData<IFieldInfo>>('/metadata/fields');
}
