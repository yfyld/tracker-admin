import { DYNAMIC_TIME } from './../../constants/constant';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { IDate } from './../../types/index';
import {
  IEventAnalyseData,
  IFunnelAnalyseData,
  IFunnelAnalyseParam,
  IPathAnalyseData,
  IPathAnalyseParam
} from './../../api/analyse.api';
import { IEventAnalyseParam } from '@/api';
import { doGetEventAnalyse, doGetFunnelAnalyse, doGetPathAnalyse } from './../actions/analyse.action';
import { doResetStore } from '@/store/actions';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';

export interface AnalyseState {
  eventAnalyseData: IEventAnalyseData;
  eventAnalyseParam: IEventAnalyseParam;

  funnelAnalyseData: IFunnelAnalyseData;
  funnelAnalyseParam: IFunnelAnalyseParam;

  pathAnalyseData: IPathAnalyseData;
  pathAnalyseParam: IPathAnalyseParam;

  analyseLoading: boolean;
}

const initialState = (): AnalyseState => ({
  analyseLoading: false,
  eventAnalyseData: { list: [], dimension: '', dimensionValues: [], timeUnit: 'DAY', type: 'LINE' },
  eventAnalyseParam: {
    projectId: null,
    indicators: [
      {
        metadataCode: '_ALL_METADATA',
        metadataName: '所有事件',
        type: 'PV',
        id: 1,
        filter: {
          filterType: 'OR',
          filterValues: []
        }
      }
    ],
    dimension: '',
    filter: {
      filterType: 'OR',
      filterValues: []
    },

    type: 'LINE',
    timeUnit: 'DAY',
    dateStart: DYNAMIC_TIME[1].startDate(),
    dateEnd: DYNAMIC_TIME[1].endDate(),
    dateType: DYNAMIC_TIME[1].value
  },
  funnelAnalyseData: { list: [], dimension: '', dimensionValues: [], timeUnit: 'DAY', type: 'LINE', conversionRate: 0 },
  funnelAnalyseParam: {
    projectId: null,
    indicatorType: 'PV',
    indicators: [
      {
        metadataCode: '_ALL_METADATA',
        metadataName: '所有事件',
        type: 'PV',
        id: 1,
        filter: {
          filterType: 'OR',
          filterValues: []
        }
      }
    ],
    dimension: '',
    filter: {
      filterType: 'OR',
      filterValues: []
    },

    type: 'FUNNEL',
    dateStart: DYNAMIC_TIME[8].startDate(),
    dateEnd: DYNAMIC_TIME[8].endDate(),
    dateType: DYNAMIC_TIME[8].value
  },

  pathAnalyseData: { list: [], type: 'LINE' },
  pathAnalyseParam: {
    projectId: null,
    indicatorType: 'PV',
    indicators: [
      {
        metadataCode: '_ALL_METADATA',
        metadataName: '所有事件',
        type: 'PV',
        id: 1,
        filter: {
          filterType: 'OR',
          filterValues: []
        }
      }
    ],

    filter: {
      filterType: 'OR',
      filterValues: []
    },

    pathsData: [],

    type: 'FUNNEL',
    dateStart: DYNAMIC_TIME[8].startDate(),
    dateEnd: DYNAMIC_TIME[8].endDate(),
    dateType: DYNAMIC_TIME[8].value
  }
});

export const analyseReducer = (state: AnalyseState = initialState(), action: IAction): AnalyseState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doGetEventAnalyse.request):
      return update(state, { eventAnalyseParam: { $set: action.payload }, analyseLoading: { $set: true } });
    case getType(doGetEventAnalyse.success):
      return update(state, {
        eventAnalyseData: { $set: action.payload },
        analyseLoading: { $set: false }
      });

    case getType(doGetFunnelAnalyse.request):
      return update(state, { funnelAnalyseParam: { $set: action.payload }, analyseLoading: { $set: true } });
    case getType(doGetFunnelAnalyse.success):
      return update(state, {
        funnelAnalyseData: { $set: action.payload },
        analyseLoading: { $set: false }
      });

    case getType(doGetPathAnalyse.request):
      return update(state, { pathAnalyseParam: { $set: action.payload }, analyseLoading: { $set: true } });
    case getType(doGetPathAnalyse.success):
      return update(state, {
        pathAnalyseData: { $set: action.payload },
        analyseLoading: { $set: false }
      });

    default:
      return state;
  }
};
