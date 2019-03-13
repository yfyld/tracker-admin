import { RootState } from '@/store/reducers';
import * as actions from '@/store/actions'
import { ActionType } from 'typesafe-actions'

export type Action = ActionType<typeof actions>

export interface ActionAny {
  type: string
  payload?: any
}


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

//用户
export interface LoginParams{
  username:string,
  password:string
}
export interface SignupParams extends LoginParams{
  nickName:string
}



export interface UserInfo{
  id?:number,
  username?:string,
  nickName?:string,
  type?:"ADMIN"
}




//project

export interface ProjectInfo{
  id?:number,
  name?:string,
  adminId?:number
}




export interface GetProjectListParams{
  role?:string,
  page?:number,
  pageSize?:number
}