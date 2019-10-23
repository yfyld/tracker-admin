import { IPageData } from './../types/index';
import fetch from './http';

export interface IReportInfo {
  id?: number;
  name: string;
  projectId: number;
  description: string;
  type: string;
  data: Object;
}

export interface IReportListParam {
  page: number;
  pageSize: number;
  projectId: number;
  name?: string;
  inBoard?: number;
  status?: number;
  sortKey?: string;
  sortType?: string;
}

export interface IReportAddParam {
  name: string;
  projectId: number;
  description: string;
  type: string;
  data: Object;
}

export interface IReportUpdateParam {
  name: string;
  projectId: number;
  description: string;
  type: string;
  data: Object;
  id: number;
}
export function fetchReportList(params: IReportListParam) {
  return fetch.get<IPageData<IReportInfo>>('/report', params);
}

export function fetchReportAdd(params: IReportAddParam) {
  return fetch.post('/report', params);
}

export function fetchReportDel(id: number) {
  return fetch.delete(`/report/${id}`);
}

export function fetchReportUpdate(params: IReportUpdateParam) {
  return fetch.put('/report', params);
}
