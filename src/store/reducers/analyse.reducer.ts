import { doGetEventAnalyse } from './../actions/analyse.action';
import { doResetStore } from '@/store/actions';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import moment from 'moment';

export interface AnalyseState {
  eventAnalyseData: any;
  eventAnalyseParam: any;
}

const initialState = (): AnalyseState => ({
  eventAnalyseData: { list: [] },
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
      date: [moment(new Date().setHours(0, 0, 0, 0)), moment(new Date().setHours(23, 59, 59, 999))],
      type: 'DAY'
    },
    type: 'LINE',
    timeUlit: 'DAY'
  }
});

export const analyseReducer = (state: AnalyseState = initialState(), action: IAction): AnalyseState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doGetEventAnalyse.request):
      return update(state, { eventAnalyseParam: { $set: action.payload } });
    case getType(doGetEventAnalyse.success):
      return update(state, {
        eventAnalyseData: { $set: action.payload }
      });

    default:
      return state;
  }
};
