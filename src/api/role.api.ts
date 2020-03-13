import { IPageQuery } from './../types/index';
import { IPageData } from '@/types';
import fetch from './http';

export interface IBaseRole {
  name: string;
  description?: string;
  code: string;
  status: number;
  type: number;
}

export interface IRoleListItem extends IBaseRole {
  id: number;
  updaterId: number;
  updatedAt: Date;
  updaterNickname: string;
}

export interface IQueryRole extends IPageQuery {
  name?: string;
}

export interface IUpdateRole extends IBaseRole {
  id: number;
}

export interface IRolePermission {
  id: string;
  name: string;
  description?: string;
  code: string;
  status: number;
  type: number;
  checked: boolean; // 选中？
  disabled: boolean; // 不可点击，超管等角色不能修改其权限
}

export interface IUpdateRolePermissions {
  roleId: number,
  permissionIds: number[]
}

export type IRoleItemList = IPageData<IRoleListItem>;

// 新建角色
export function fetchPostRole(params: IBaseRole) {
  return fetch.post<IRoleListItem>('/role', params);
}

// 获取角色列表
export function fetchGetRole(params: IQueryRole) {
  return fetch.get<IRoleItemList>('/role', params);
}

// 更新角色
export function fetchPutRole(params: IUpdateRole) {
  return fetch.put('/role', params);
}

// 删除角色
export function fetchDeleteRole(roleId: number) {
  return fetch.delete(`/role/${roleId}`);
}

// 获取角色对应权限列表
export function fetchGetRolePermissions(roleId: number) {
  return fetch.get<IRolePermission[]>(`/role/rolePermissions/${roleId}`);
}

// 更新角色下所有权限
export function fetchPutRolePermissions(params: IUpdateRolePermissions) {
  return fetch.put('/role/rolePermissions', params);
}
