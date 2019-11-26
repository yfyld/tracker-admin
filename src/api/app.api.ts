import { IPageQuery } from './../types/index';
import { IPageData } from '@/types';
import fetch from './http';

export interface IUserInfoParam {}

export interface ILoginParam {
  username: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
}

export interface ISignupParam {
  username: string;
  password: string;
  nickName: string;
}

export interface IUserInfo {
  id: number;
  username: string;
  nickname?: string;
  type?: 'ADMIN';
}
export interface IUserListParam extends IPageQuery {
  nickname?: string;
  username?: string;
}

export type IUserList = IPageData<IUserInfo>;

export function fetchUserInfo() {
  return fetch.get<IUserInfo>('/user/info');
}
export function fetchLogin(params: ILoginParam) {
  return fetch.post<ILoginRes>('/user/signin', params);
}
export function fetchSignup(params: ISignupParam) {
  return fetch.post('/user/signup', params);
}

export function fetchUserList(param: IUserListParam) {
  return fetch.get<IUserList>('/user', param);
}
