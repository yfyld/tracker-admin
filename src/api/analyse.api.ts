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
  metadataCode: string;
  metadataName: string;
  customName?: string;
  type: string;
  filter: IFilterInfo;
  id: number;
}

export interface IEventAnalyseParam {
  indicators: IIndicatorInfo[];
  filter: IFilterInfo;
  dimension: string;
  type: string;
  timeUnit: string;
  projectId: number;
  dateType: string;
  dateStart: number;
  dateEnd: number;
}

interface IEventAnalyseDataItemDataItem {
  count: number;
  key: string;
  time: string;
  [prop: string]: string | number;
}

export interface ICompareInfo {
  qoqCurrent: string;
  qoqPercentage: string;
  qoqPrev: string;
  yoyCurrent: string;
  yoyPercentage: string;
  yoyPrev: string;
}

interface IEventAnalyseDataItem {
  key: string;
  metadataCode: string;
  metadataName: string;
  customName?: string;
  data: IEventAnalyseDataItemDataItem[];
  compare: ICompareInfo;
}

export interface IEventAnalyseData {
  list: IEventAnalyseDataItem[];
  dimension: string;
  dimensionValues: string[];
  timeUnit: string;
  type: string;
}

export interface IFunnelAnalyseParam {
  indicators: IIndicatorInfo[];
  indicatorType: string;
  filter: IFilterInfo;
  dimension: string;
  type: string;
  projectId: number;
  dateType: string;
  dateStart: number;
  dateEnd: number;
}

interface IFunnelAnalyseDataItemDataItem {
  time: string;
  conversionRateMap: { [prop: string]: number };
  steps: IFunnelDataItem[];
}

interface IFunnelDataItem {
  count: number;
  conversionRate?: number;
  key: string;
  metadataName: string;
  metadataCode: string;
  customName?: string;
}
interface IFunnelAnalyseDataItem {
  key: string;
  dimension: string;
  data: IFunnelAnalyseDataItemDataItem[];
  allData: IFunnelDataItem[];
  conversionRateMap: { [prop: string]: number };
}

export interface IFunnelAnalyseData {
  list: IFunnelAnalyseDataItem[];
  dimension: string;
  dimensionValues: string[];
  timeUnit: string;
  conversionRate: number;
  type: string;
}

export interface IPathDataInfo {
  id: number;
  paths: number[];
}

export interface IPathAnalyseParam {
  indicators: IIndicatorInfo[];
  filter: IFilterInfo;
  indicatorType: string;
  pathsData: IPathDataInfo[];
  type: string;
  projectId: number;
  dateType: string;
  dateStart: number;
  dateEnd: number;
}
export interface IPathAnalyseData {
  list: any[];
  type: string;
}

export function fetchEventAnalyseData(param: IEventAnalyseParam) {
  return fetch.post<IEventAnalyseData>('/analyse/event', { ...param, SHOW_LOADING: false });
}

export function fetchFunnelAnalyseData(param: IFunnelAnalyseParam) {
  return fetch.post<IFunnelAnalyseData>('/analyse/funnel', { ...param, SHOW_LOADING: false });
}
