import { IReportInfo } from './report.api';
import fetch from './http';
import { IPageData } from '@/types';

export interface IGridLayout {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}

export interface IBoardInfo {
  id: number;
  name: string;
  layout: IGridLayout[];
}

export interface IBoardListParam {
  page: 1;
  pageSize: 20;
  projectId?: number;
  status?: number;
  isPublic?: boolean;
  name?: string;
}

export interface IBoardAddParam {
  projectId: number;
  isPublic: boolean;
  name: string;
  description: '';
  layout: IGridLayout[];
  reports: IReportInfo[];
}

export interface IBoardUpdateParam {
  id: number;
  projectId: number;
  isPublic: boolean;
  name: string;
  description: '';
  layout: IGridLayout[];
  reports: IReportInfo[];
}

export function fetchBoardList(params: IBoardListParam) {
  return fetch.get<IPageData<IBoardInfo>>('/booard/', params);
}

export function fetchBoardAdd(params: IBoardAddParam) {
  return fetch.post('/booard/', params);
}

export function fetchBoardUpdate(params: IBoardUpdateParam) {
  return fetch.put('/booard/', params);
}

export function fetchBoardDel(id: number) {
  return fetch.delete(`/booard/${id}`);
}
