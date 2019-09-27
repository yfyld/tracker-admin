import fetch from './http';


export interface IProjectListParam{
  role?: string
  page: number
  pageSize: number
}

export interface IProjectInfo {
  id?: number
  name?: string
  adminId?: number
}

export interface IAddProject{
  id?: number
  name?: string
  adminId?: number
}

export enum IRole {
  super = 'SUPER_ADMIN',
  admin = 'ADMIN',
  developer = 'DEVELOPER',
  member = ''
}


export function fetchProjectList(params: IProjectListParam) {
  return fetch.get('/project/', params)
}

export function fetchProjectInfo(projectId:number) {
  return fetch.get<IProjectInfo>(`/project/${projectId}`)
}

export function fetchProjectAdd(params: IAddProject) {
  return fetch.post('/project/', params)
}

export function fetchProjectDel(projectId:number) {
  return fetch.delete(`/project/${projectId}`)
}