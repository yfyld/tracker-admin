import { IPageData } from './../types/index';
import fetch from './http';

export interface ITeamMemberInfo {
  id: number;
  username: string;
  nickname: string;
}

export interface ITeamInfo {
  id: number;
  name: string;
  description: string;
  public: boolean;
  creator: ITeamMemberInfo;
  members: ITeamMemberInfo[];
}

export interface ITeamListParam {
  page: number;
  pageSize: number;
  name?: string;
  relevance?: number;
}

export interface ITeamAddParam {
  name: string;
  description: string;
  public: boolean;
  members: ITeamMemberInfo[];
}

export interface ITeamUpdateParam {
  name: string;
  description: string;
  public: boolean;
  members: number[];
  id: number;
  creatorId: number;
}
export interface ITeamInfoParam {
  id: number;
}

export type ITeamList = IPageData<ITeamInfo>;

export function fetchTeamList(params: ITeamListParam) {
  return fetch.get<ITeamList>('/team', params);
}

export function fetchTeamInfo(params: ITeamInfoParam) {
  return fetch.get<ITeamInfo>('/team/info', params);
}

export function fetchTeamAdd(params: ITeamAddParam) {
  return fetch.post('/team', params);
}

export function fetchTeamDel(id: number) {
  return fetch.delete(`/team/${id}`);
}

export function fetchTeamUpdate(params: ITeamUpdateParam) {
  return fetch.put('/team', params);
}
