import fetch from './http';
import { IPageData } from '@/types';
import { IMemberInfo } from './user.api';

export interface IProjectListParam {
  role?: string;
  projectName?: string;
  page: number;
  pageSize: number;
  teamId?: number;
}

export interface IProjectInfo {
  id: number;
  name: string;
  image: string;
  associationProjects: IProjectInfo[];
  creator: {
    nickname: string;
  };
  members: IMemberInfo[];
  description: string;
  trackKey: string;
}

export interface IAddProject {
  name: string;
  teamId?: number;
  description: string;
}

export interface IProjectAddRes {
  id: string;
}

export interface IProjectUpdateParam {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface IProjectListItem {
  id: number;
  name: string;
  image: string;
  creator: IMemberInfo;
  description: string;
}

export enum IRole {
  super = 'SUPER_ADMIN',
  admin = 'ADMIN',
  developer = 'DEVELOPER',
  member = ''
}

export interface IProjectMemberAddParam {
  userIds: number[];
  projectId: number;
  roleCode: string;
}

export interface IProjectMemberUpdateParam {
  userIds: number[];
  projectId: number;
  roleCode: string;
}

export interface IProjectMemberDelParam {
  userIds: number[];
  projectId: number;
}

export function fetchProjectList(params: IProjectListParam) {
  return fetch.get<IPageData<IProjectListItem>>('/project/', params);
}

export function fetchProjectInfo(projectId: number) {
  return fetch.get<IProjectInfo>(`/project/info`, { projectId });
}

export function fetchProjectAdd(params: IAddProject) {
  return fetch.post<IProjectAddRes>('/project/', params);
}

export function fetchProjectDel(projectId: number) {
  return fetch.delete(`/project/${projectId}`);
}

export function fetchProjectUpdate(params: IProjectUpdateParam) {
  return fetch.put(`/project`, params);
}

export function fetchPrjectMemberAdd(params: IProjectMemberAddParam) {
  return fetch.post('project/add-members', params);
}

export function fetchPrjectMemberUpdate(params: IProjectMemberUpdateParam) {
  return fetch.post('project/update-members', params);
}

export function fetchPrjectMemberDel(params: IProjectMemberDelParam) {
  return fetch.post('project/delete-members', params);
}
