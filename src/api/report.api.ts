import { IBoardInfo } from './board.api';
import { IPageData, IInfoParam, IDate } from './../types/index';
import fetch from './http';

export interface IReportInfo {
  id?: number;
  name: string;
  projectId: number;
  boards?: IBoardInfo[];
  description: string;
  type: string;
  data: Object;
  showType?: string;
  dateStart?: number;
  dateEnd?: number;
  dateType: string;
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
  boardId?: number;
  description: string;
  type: string;
  data: Object;
  dateStart?: number;
  dateEnd?: number;
  dateType: string;
}

export interface IReportUpdateParam {
  name: string;
  projectId: number;
  description: string;
  type: string;
  data: Object;
  id: number;
}

export interface IFilterValue {
  key: string;
  type: string;
  value: any;
  id: number;
}

export interface IFilterInfo {
  filterType: string;
  filterValues: IFilterValue[];
}

export interface IIndicatorInfo {
  trackId: string;
  type: string;
  filter: IFilterInfo;
  id: number;
}

export interface IEventQuery {
  indicators: IIndicatorInfo[];
  filter: IFilterInfo;
  dimension: string;
  time: IDate;
  type: string;
  timeUlit: string;
}

export function fetchReportList(params: IReportListParam) {
  return fetch.get<IPageData<IReportInfo>>('/report', params);
}

export function fetchReportInfo(params: IInfoParam) {
  return fetch.get<IReportInfo>('/report/info', params);
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
