import { doGetBoardList } from './../actions/board.action';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import { IBoardInfo, IReportInfo, IBoardListParam } from '@/api';

export interface BoardState {
  boardInfo: IBoardInfo;
  boardListParams: IBoardListParam;
  boardList: IPageData<IBoardInfo>;
}

const initialState = (): BoardState => ({
  boardInfo: {
    id: null,
    name: null,
    // reports: [],
    layout: []
  },
  boardListParams: {
    page: 1,
    pageSize: 20
  },
  boardList: {
    list: [],
    totalCount: 0
  }
});

export const boardReducer = (state: BoardState = initialState(), action: IAction): BoardState => {
  switch (action.type) {
    case getType(doGetBoardList.request):
      return update(state, { boardListParams: { $set: action.payload } });
    case getType(doGetBoardList.success):
      return update(state, {
        boardList: { $set: action.payload }
      });
    default:
      return state;
  }
};
