import { IRoleInfo } from './role.api';
import { IBaseRole } from '@/api';
import { IRole } from './project.api';
import { IPageQuery } from './../types/index';
import { IPageData } from '@/types';
import fetch from './http';

export interface IUserInfoParam {}

export interface ILoginParamOrUpRes {
  accessToken: string;
}

export interface IUserInfo {
  id: number;
  username: string;
  nickname?: string;
  mobile?: string;
  type?: number;
}

export interface ILoginParam {
  username: string;
  password: string;
}

export interface ISignupParam {
  username: string;
  password: string;
  nickname: string;
}

export interface ILoginRes {
  accessToken: string;
}

export interface IBaseUser {
  id: number;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  roles: IRoleInfo[];
}

export interface IUserListItem extends IBaseUser {
  updaterNickname: string;
  enableEdit: boolean;
  roleCodes: string[];
  roleNames: string[];
}

export interface IUserListParam extends IPageQuery {
  nickname?: string;
  username?: string;
}

export interface IUserRole {
  id: string;
  name: string;
  description?: string;
  code: string;
  status: number;
  type: number;
  checked: boolean;
  disabled: boolean;
}

export interface IUpdateUserRoles {
  userId: number;
  roleIds: number[];
}

export type IUserList = IPageData<IUserListItem>;

// 获取当前登录用户信息
export function fetchUserInfo() {
  return fetch.get<IBaseUser>('/user/info');
}

// 登录
export function fetchSignIn(params: ILoginParam) {
  return fetch.post<ILoginRes>('/auth/signIn', params);
}

// 注销
export function fetchSignOut() {
  return fetch.get('/auth/signOut');
}

// 注册
export function fetchSignUp(params: ISignupParam) {
  return fetch.post<ILoginRes>('/auth/signUp', params);
}

// 删除用户
export function fetchDeleteUser(userId: number) {
  return fetch.delete(`/user/${userId}`);
}

// 获取用户列表（只有超管有权限）
export function fetchUserList(param: IUserListParam) {
  return fetch.get<IUserList>('/user', param);
}

// 更新用户信息
export function fetchPutUser(params: IBaseUser) {
  return fetch.put('/user', params);
}

// 管理员更新用户信息
export function fetchPutUserByAdmin(params: IBaseUser) {
  return fetch.put('/user/admin-update', params);
}

// 获取用户对应角色列表
export function fetchGetUserRoles(userId: number) {
  return fetch.get<IUserRole[]>(`/user/userRoles/${userId}`);
}

// 更新用户下所有角色
export function fetchPutUserRoles(params: IUpdateUserRoles) {
  return fetch.put('/user/userRoles', params);
}
