import { IStoreState as _IStoreState } from '@/store/reducers';
import * as actions from '@/store/actions';
import { ActionType } from 'typesafe-actions';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';

//全局

export type IAction = ActionType<typeof actions>;

export interface IActionAny {
  type: string;
  payload?: any;
}

export type IStoreState = _IStoreState;

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

export interface IListData<T> {
  list: T[];
}

export interface IPageQuery {
  page: number;
  pageSize: number;
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

export interface IDeleteParam {
  projectId: number;
  id: number;
}
export interface IInfoParam {
  projectId: number;
  id: number;
}

export interface IDate {
  dateStart: number;
  dateEnd: number;
  dateType: string;
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
