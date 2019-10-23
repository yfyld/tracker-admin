import { IDeleteParam, IPageQuery } from './../types/index';
import fetch from './http';
import { IPageData } from '@/types';

export interface IMetadataInfo {
  id: number;
  name: string;
  code: string;
  tags?: string[];
}

export interface IMetadataListParam extends IPageQuery {
  tags?: string;
  status?: number;
  name?: string;
  code?: string;
  projectId: number;
}

export interface IMetadataAddParam {
  code: string;
  name?: string;
  des?: string;
  projectId: number;
}

export interface IMetadataUpdateParam {
  code: string;
  name?: string;
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
  code: string;
  name?: string;
  des?: string;
}

export interface IFieldListParam {
  name?: string;
  page: number;
  pageSize: number;
  projectId: number;
}

export function fetchMetadataList(params: IMetadataListParam) {
  return fetch.get<IPageData<IMetadataInfo>>('/metadata/', params);
}

export function fetchMetadataAdd(params: IMetadataAddParam) {
  return fetch.post('/metadata/', params);
}

export function fetchMetadataDel(params: IDeleteParam) {
  return fetch.delete('/metadata/', params);
}

export function fetchMetadataUpdate(params: IMetadataUpdateParam) {
  return fetch.put('/metadata/', params);
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

export function fetchFieldList(params: IFieldListParam) {
  return fetch.get<IPageData<IFieldInfo>>('/metadata/fields', params);
}

export function fetchActiveFieldList(params: IFieldListParam) {
  return fetch.get<IPageData<IFieldInfo>>('/metadata/active-fields', params);
}
