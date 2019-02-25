import { RootState } from '@/store/index';
import * as actions from '@/store/actions'
import { ActionType } from 'typesafe-actions'

export type Action = ActionType<typeof actions>
export type RootState = RootState;

export interface Store {
  nameSpace: string,
  actions?: any,
  reducers?: any,
  effects?: any
}


export interface PageData<T>{
  totalCount:number,
  list:T[]
}

export interface Handler {
  action:Action,
  ttl:number,
  disable:boolean
} 