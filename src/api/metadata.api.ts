import fetch from './http';
import { IPageData } from '@/types';

export interface IMetadataInfo {
  id: number;
  name: string;
  code: string;
  tags?: string[];
}

export interface IMetadataListParam {
  tags?: string;
  status?: number;
  name?: string;
  page: number;
  pageSize: number;
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

export function fetchMetadataDel(id: number) {
  return fetch.delete('/metadata/id');
}

export function fetchMetadataUpdate(params: IMetadataUpdateParam) {
  return fetch.put('/metadata/', params);
}

export function fetchFieldList(params: IFieldListParam) {
  return fetch.get<IPageData<IFieldInfo>>('/metadata/fields', params);
}

export function fetchActiveFieldList(params: IFieldListParam) {
  return fetch.get<IPageData<IFieldInfo>>('/metadata/active-fields', params);
}
