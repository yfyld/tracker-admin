import fetch from './http';
import { IPageData } from '@/types';

export interface IMetadataInfo {
  id: number;
  name: string;
  tags?: string[];
}

export interface IMetadataListParam {
  tag?: string;
  status?: number;
  page: number;
  pageSize: number;
  projectId: number;
}

export interface IAddMetadataParam {
  code: string;
  name?: string;
  des?: string;
  projectId: number;
}

export interface IUpdateMetadataParam {
  code: string;
  name?: string;
  des?: string;
  projectId: number;
  id: number;
}

export function fetchMetadataList(params: IMetadataListParam) {
  return fetch.get<IPageData<IMetadataInfo>>('/metadata/', params);
}

export function fetchMetadataAdd(params: IAddMetadataParam) {
  return fetch.post('/metadata/', params);
}

export function fetchMetadataDel(id: number) {
  return fetch.delete('/metadata/id');
}

export function fetchMetadataUpdate(params: IUpdateMetadataParam) {
  return fetch.put('/metadata/', params);
}
