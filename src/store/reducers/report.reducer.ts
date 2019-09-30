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

const initialState = (): ReportState => ({
  reportInfo: {
    id: null,
    name: null,
    projectId: null
  },
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
    default:
      return state;
  }
};
