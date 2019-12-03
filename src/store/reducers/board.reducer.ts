import { doResetStore } from '@/store/actions';
import { doGetBoardList, doGetBoardInfo, doGetMyBoardList } from './../actions/board.action';
import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import { IAction, IPageData } from '@/types';
import { IBoardInfo, IReportInfo, IBoardListParam, IMyBoardListParam, IMyBoardListItem } from '@/api';

export interface BoardState {
  boardInfo: IBoardInfo;
  boardListParams: IBoardListParam;
  boardList: IPageData<IBoardInfo>;
  myBoardListParams: IMyBoardListParam;
  myBoardList: IPageData<IMyBoardListItem>;
}

const initialState = (): BoardState => ({
  boardInfo: {
    id: null,
    name: null,
    projectId: null,
    reports: [],
    layout: []
  },
  boardListParams: {
    page: 1,
    pageSize: 20
  },
  boardList: {
    list: [],
    totalCount: 0
  },
  myBoardListParams: {
    type: 0,
    page: 1,
    pageSize: 20
  },
  myBoardList: {
    list: [],
    totalCount: 0
  }
});

export const boardReducer = (state: BoardState = initialState(), action: IAction): BoardState => {
  switch (action.type) {
    case getType(doResetStore):
      return update(state, { $set: initialState() });
    case getType(doGetBoardList.request):
      return update(state, { boardListParams: { $set: action.payload } });
    case getType(doGetBoardList.success):
      return update(state, {
        boardList: { $set: action.payload }
      });
    case getType(doGetMyBoardList.request):
      return update(state, { myBoardListParams: { $set: action.payload } });
    case getType(doGetMyBoardList.success):
      return update(state, {
        myBoardList: { $set: action.payload }
      });
    case getType(doGetBoardInfo.success):
      return update(state, {
        boardInfo: { $set: action.payload }
      });
    default:
      return state;
  }
};
