import { IStoreState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { ActionType } from 'typesafe-actions';

//全局

export type IAction = ActionType<typeof actions>;

export interface IActionAny {
  type: string;
  payload?: any;
}

export type IStoreState = IStoreState;

export interface Store {
  nameSpace: string;
  actions?: any;
  reducers?: any;
  effects?: any;
}

export interface IPageData<T> {
  totalCount: number;
  list: T[];
}

export interface IHandler {
  action: IAction;
  ttl: number;
  disable: boolean;
}

export interface IMenuItem {
  key: string;
  name: string;
  icon: string;
  link?: string;
  auth?: string[];
  children?: IMenuItem[];
  action?: string;
}

// //project

// export interface ProjectInfo {
//   id?: number
//   name?: string
//   adminId?: number
// }

// export enum Role {
//   super = 'SUPER_ADMIN',
//   admin = 'ADMIN',
//   developer = 'DEVELOPER',
//   member = ''
// }

// export interface GetProjectListParams {
//   role?: string
//   page: number
//   pageSize: number
// }

// export interface AddProjectParams {
//   name: string
// }
