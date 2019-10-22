import { doResetReportInfo } from './../actions/report.action';
import { doGetReportList } from '../actions/report.action';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import { IReportInfo, IReportListParam } from '@/api';

export interface ReportState {
  reportInfo: IReportInfo;
  reportListParams: IReportListParam;
  reportList: IPageData<IReportInfo>;
}

const eventAnalyseInital = (type?: string): IReportInfo => {
  if (type === 'EVENT') {
    return {
      name: '事件分析',
      projectId: null,
      description: '描述',
      type: 'EVENT',
      data: {}
    };
  } else {
    return {
      name: '事件分析',
      projectId: null,
      description: '描述',
      type: 'EVENT',
      data: {}
    };
  }
};

const initialState = (): ReportState => ({
  reportInfo: eventAnalyseInital(),
  reportListParams: {
    page: 1,
    pageSize: 20
  },
  reportList: {
    list: [],
    totalCount: 0
  }
});

export const reportReducer = (state: ReportState = initialState(), action: IAction): ReportState => {
  switch (action.type) {
    case getType(doGetReportList.request):
      return update(state, { reportListParams: { $set: action.payload } });
    case getType(doGetReportList.success):
      return update(state, {
        reportList: { $set: action.payload }
      });
    case getType(doResetReportInfo):
      return update(state, {
        reportInfo: { $set: eventAnalyseInital(action.payload) }
      });

    default:
      return state;
  }
};
