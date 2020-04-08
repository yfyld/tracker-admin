import fetch from './http';

import { IDate } from '@/types';

export interface IFilterValue {
  key: string;
  type: string;
  value: any;
  id: string;
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
  id: string;
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

export interface IChildPageInfo {
  id: string;
  key: string;
  filter: IFilterInfo;
}

export interface IChildPageData {
  parentId: string;
  key: string;
  children: IChildPageInfo[];
}

export interface IPathAnalyseParam {
  indicators: IIndicatorInfo[];
  filter: IFilterInfo;
  indicatorType: string;
  childPageData: IChildPageData[];
  type: string;
  projectId: number;
  dateType: string;
  dateStart: number;
  dateEnd: number;
}

export interface IPathAnalyseData {
  data: IPathAnalyseDataDataItem[];
  links: IPathAnalyseDataLinksItem[];
  indicatorType: string;
}

export interface IPathAnalyseDataDataItem {
  id: string;
  name: string;
  value: number;
}

export interface IPathAnalyseDataLinksItem {
  source: string;
  target: string;
  value: number;
  conversionRate: number;
  sourceName: string;
  targetName: string;
}

export function fetchEventAnalyseData(param: IEventAnalyseParam) {
  return fetch.post<IEventAnalyseData>('/analyse/event', { ...param, SHOW_LOADING: false });
}

export function fetchFunnelAnalyseData(param: IFunnelAnalyseParam) {
  return fetch.post<IFunnelAnalyseData>('/analyse/funnel', { ...param, SHOW_LOADING: false });
}

export function fetchPathAnalyseData(param: IPathAnalyseParam) {
  return fetch.post<IPathAnalyseData>('/analyse/path', { ...param, SHOW_LOADING: false });
}
