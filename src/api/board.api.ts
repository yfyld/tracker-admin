import RGL from 'react-grid-layout';
import { IPageQuery } from './../types/index';
import { IReportInfo } from './report.api';
import fetch from './http';
import { IPageData } from '@/types';

export interface IBoardInfo {
  id: number;
  name: string;
  projectId: number;
  layout: RGL.Layout[];
  reportList: IReportInfo[];
}

export interface IBoardInfoParam {
  projectId: number;
  boardId: number;
}

export interface IBoardListParam extends IPageQuery {
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
  layout: RGL.Layout[];
  reports: IReportInfo[];
}

export interface IBoardUpdateParam {
  id: number;
  projectId: number;
  isPublic?: boolean;
  name?: string;
  description?: '';
  layout?: RGL.Layout[];
}

export function fetchBoardList(params: IBoardListParam) {
  return fetch.get<IPageData<IBoardInfo>>('/board/', params);
}

export function fetchBoardInfo(params: IBoardInfoParam) {
  return fetch.get<IBoardInfo>('/board/info', params);
}

export function fetchBoardAdd(params: IBoardAddParam) {
  return fetch.post('/board/', params);
}

export function fetchBoardUpdate(params: IBoardUpdateParam) {
  return fetch.put('/board/', params);
}

export function fetchBoardDel(id: number) {
  return fetch.delete(`/board/${id}`);
}
