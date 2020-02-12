import fetch from './http';

import { IDate } from '@/types';

export interface IFilterValue {
  key: string;
  type: string;
  value: any;
  id: number;
}

export interface IFilterInfo {
  filterType: string;
  filterValues: IFilterValue[];
}

export interface IIndicatorInfo {
  trackId: string;
  metadataCode: string;
  metadataName: string;
  type: string;
  filter: IFilterInfo;
  id: number;
}

export interface IEventAnalyseParam {
  indicators: IIndicatorInfo[];
  filter: IFilterInfo;
  dimension: string;
  time: IDate;
  type: string;
  timeUlit: string;
  projectId: number;
}
export function fetchEventAnalyseData(param: IEventAnalyseParam) {
  return fetch.post<any>('/analyse/event', param);
}
