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
  creator: ITeamMemberInfo;
  members: ITeamMemberInfo[];
}

export interface ITeamListParam {
  page: number;
  pageSize: number;
  teamName?: string;
  relevance?: boolean;
}

export interface ITeamAddParam {
  name: string;
  description: string;
  members: ITeamMemberInfo[];
}

export interface ITeamUpdateParam {
  name: string;
  description: string;
  members: ITeamMemberInfo[];
  id: number;
  creator: ITeamMemberInfo;
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
