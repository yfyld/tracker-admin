import fetch from './http';
import { IPageData } from '@/types';

export interface IProjectListParam {
  role?: string;
  name?: string;
  page: number;
  pageSize: number;
}

export interface IProjectInfo {
  id: number;
  name: string;
  image: string;
  creator: {
    nickname: string;
  };
  members: IMemberInfo[];
  description: string;
}

export interface IMemberInfo {
  id: number;
  username: string;
  nickname: string;
  roleCode: string;
}

export interface IAddProject {
  name: string;
}
export interface IAddProjectRes {
  id: string;
}

export interface IUpdateProjectParam {
  id: number;
  name: string;
}

export interface IProjectListItem {
  id: number;
  name: string;
  image: string;
  creator: {
    nickname: string;
  };
  description: string;
}

export enum IRole {
  super = 'SUPER_ADMIN',
  admin = 'ADMIN',
  developer = 'DEVELOPER',
  member = ''
}

export function fetchProjectList(params: IProjectListParam) {
  return fetch.get<IPageData<IProjectListItem>>('/project/', params);
}

export function fetchProjectInfo(projectId: number) {
  return fetch.get<IProjectInfo>(`/project/info`, { projectId });
}

export function fetchProjectAdd(params: IAddProject) {
  return fetch.post<IAddProjectRes>('/project/', params);
}

export function fetchProjectDel(projectId: number) {
  return fetch.delete(`/project/${projectId}`);
}

export function fetchProjectUpdate(parmas: IUpdateProjectParam) {
  return fetch.put(`/project`, parmas);
}
