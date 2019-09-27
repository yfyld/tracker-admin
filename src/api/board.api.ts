import fetch from './http';
export interface IBoardInfo {
  id: number
  name: string
  layout: IGridLayout[]
}
export interface IBoardPaneInfo {
  id: number,
  name:string
}
export interface IGridLayout {
  x: number
  y: number
  w: number
  h: number
  i: string
}

export function fetchProjectList1() {
  return fetch.get('/project/')
}