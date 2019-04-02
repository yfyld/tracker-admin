import { RootState } from '@/store/reducers'
import * as actions from '@/store/actions'
import { ActionType } from 'typesafe-actions'

export type Action = ActionType<typeof actions>

export interface ActionAny {
  type: string
  payload?: any
}

export type RootState = RootState

export interface Store {
  nameSpace: string
  actions?: any
  reducers?: any
  effects?: any
}

export interface PageData<T> {
  totalCount: number
  list: T[]
}

export interface Handler {
  action: Action
  ttl: number
  disable: boolean
}

export interface MenuItem {
  key: string
  name: string
  icon: string
  link?: string
  auth?: string[]
  children?: MenuItem[]
}

//用户
export interface LoginParams {
  username: string
  password: string
}
export interface SignupParams extends LoginParams {
  nickName: string
}

export interface UserInfo {
  id?: number
  username?: string
  nickName?: string
  type?: 'ADMIN'
}

//project

export interface ProjectInfo {
  id?: number
  name?: string
  adminId?: number
}

export enum Role {
  super = 'SUPER_ADMIN',
  admin = 'ADMIN',
  developer = 'DEVELOPER',
  member = ''
}

export interface GetProjectListParams {
  role?: string
  page: number
  pageSize: number
}

export interface AddProjectParams {
  name: string
}

export interface MetadataInfo {
  id: number
  name: string
  tag?: string
}

export interface GetMetadataListParams {
  tag?: string
  status?: number
  page: number
  pageSize: number
  projectId: number
}

//board

export interface GridLayout {
  x: number
  y: number
  w: number
  h: number
  i: string
}
export interface BoardInfo {
  id: number
  name: string
  layout: GridLayout[]
}
export interface BoardPaneInfo {
  id: number,
  name:string
}
