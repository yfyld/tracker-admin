import { IPageQuery } from './../types/index';
import { IPageData } from '@/types';
import fetch from './http';

export interface IBasePermission {
  name: string;
  description?: string;
  code: string;
  status: number;
  type: number;
}

export interface IPermissionListItem extends IBasePermission {
  id: number;
  updaterId: number;
  updatedAt: Date;
  updaterNickname: string;
}

export interface IQueryPermission extends IPageQuery {
  name?: string;
}

// export interface IPermissionItem extends IBasePermission {
//   id: number;
//   updaterId: number;
//   updatedAt: Date;
// }

export interface IUpdatePermission extends IBasePermission {
  id: number;
}

export type IPermissionList = IPageData<IPermissionListItem>;

// 新建权限
export function fetchPostPermission(params: IBasePermission) {
  return fetch.post<IPermissionListItem>('/permission', params);
}

// 获取权限列表
export function fetchGetPermission(params: IQueryPermission) {
  return fetch.get<IPermissionList>('/permission', params);
}

// 更新权限
export function fetchPutPermission(params: IUpdatePermission) {
  return fetch.put('/permission', params);
}

// 删除权限
export function fetchDeletePermission(permissionId: number) {
  return fetch.delete(`/permission/${permissionId}`);
}
