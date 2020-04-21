import RGL from 'react-grid-layout';
import { IPageQuery, IInfoParam, IDeleteParam } from './../types/index';
import { IReportInfo } from './report.api';
import fetch from './http';
import { IPageData } from '@/types';
import { IMemberInfo } from './user.api';

export interface IBoardInfo {
  id: number;
  name: string;
  projectId: number;
  layout: RGL.Layout[];
  reports: IReportInfo[];
}

export type IBoardList = IPageData<IBoardInfo>;

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

export interface IReportAppendToBoard {
  reportId: number;
  projectId: number;
  boardIds: number[];
}

// 我的看板
export interface IMyBoardListParam {
  type: number;
  name?: string;
  page: number;
  pageSize: number;
}

export interface IMyBoardListItem {
  id: number;
  projectId: number;
  name: string;
  creator: IMemberInfo;
  description: string;
}

export interface IBoardAddResponse {
  id: number;
}

export function fetchBoardList(params: IBoardListParam) {
  return fetch.get<IPageData<IBoardInfo>>('/board/', params);
}

export function fetchBoardInfo(params: IInfoParam) {
  return fetch.get<IBoardInfo>('/board/info', params);
}

export function fetchBoardAdd(params: IBoardAddParam) {
  return fetch.post<IBoardAddResponse>('/board/', params);
}

export function fetchBoardUpdate(params: IBoardUpdateParam) {
  return fetch.put('/board/', params);
}

export function fetchBoardDel(params: IDeleteParam) {
  return fetch.delete(`/board`, params);
}

export function fetchReportAppendToBoard(params: IReportAppendToBoard) {
  return fetch.post(`/board/append`, params);
}

export function fetchMyBoardList(params: IMyBoardListParam) {
  return fetch.get<IPageData<IMyBoardListItem>>('/board/my-board', params);
}
