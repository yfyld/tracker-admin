import { DYNAMIC_TIME } from './../../constants/constant';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { IDate } from './../../types/index';
import { IEventAnalyseData } from './../../api/analyse.api';
import { IEventAnalyseParam } from '@/api';
import { doGetEventAnalyse } from './../actions/analyse.action';
import { doResetStore } from '@/store/actions';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import moment from 'moment';

export interface AnalyseState {
  eventAnalyseData: IEventAnalyseData;
  eventAnalyseParam: IEventAnalyseParam;
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
        type: 'SUM',
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
    time: {
      date: [moment(DYNAMIC_TIME[1].startDate()), moment(DYNAMIC_TIME[1].endDate())],
      type: DYNAMIC_TIME[1].value
    },
    type: 'LINE',
    timeUnit: 'DAY'
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

    default:
      return state;
  }
};
