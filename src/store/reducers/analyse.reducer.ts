import { DYNAMIC_TIME } from './../../constants/constant';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { IDate } from './../../types/index';
import { IEventAnalyseData, IFunnelAnalyseData, IFunnelAnalyseParam } from './../../api/analyse.api';
import { IEventAnalyseParam } from '@/api';
import { doGetEventAnalyse, doGetFunnelAnalyse } from './../actions/analyse.action';
import { doResetStore } from '@/store/actions';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import moment from 'moment';

export interface AnalyseState {
  eventAnalyseData: IEventAnalyseData;
  eventAnalyseParam: IEventAnalyseParam;

  funnelAnalyseData: IFunnelAnalyseData;
  funnelAnalyseParam: IFunnelAnalyseParam;

  analyseLoading: boolean;
}

const initialState = (): AnalyseState => ({
  analyseLoading: false,
  eventAnalyseData: { list: [], dimension: '', dimensionValues: [], timeUnit: 'DAY', type: 'LINE' },
  eventAnalyseParam: {
    projectId: null,
    indicators: [
      {
        trackId: '',
        metadataCode: '',
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
        trackId: '',
        metadataCode: '',
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

    default:
      return state;
  }
};
