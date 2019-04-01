import fetch from './http';
import { GetProjectListParams } from '@/types';




export function fetchProjectList(params: GetProjectListParams) {
  return fetch.get('/project/', params)
}

export function fetchProjectInfo(projectId:number) {
  return fetch.get(`/project/${projectId}`)
}

export function fetchProjectAdd(params: GetProjectListParams) {
  return fetch.post('/project/', params)
}

export function fetchProjectDel(projectId:number) {
  return fetch.delete(`/project/${projectId}`)
}