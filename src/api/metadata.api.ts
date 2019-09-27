import fetch from './http';

export interface IMetadataInfo {
  id: number
  name: string
  tag?: string
}


export interface IMetadataListParam{
  tag?: string
  status?: number
  page: number
  pageSize: number
  projectId: number
}

export function fetchMetadataList(params: IMetadataListParam) {
  return fetch.get('/metadata/', params)
}