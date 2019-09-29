// import update from 'immutability-helper'
// import { getType } from 'typesafe-actions'
import { IAction } from '@/types';
import { IBoardInfo, IBoardPaneInfo } from '@/api';

export interface BoardState {
  boardInfo: IBoardInfo;
  boardPaneList: IBoardPaneInfo[];
}

const initialState = (): BoardState => ({
  boardInfo: {
    id: null,
    name: null,
    layout: [{ x: 0, y: 0, w: 8, h: 8, i: '1' }, { x: 0, y: 0, w: 8, h: 8, i: '2' }]
  },
  boardPaneList: [
    {
      id: 1,
      name: 'app访问量'
    },
    {
      id: 2,
      name: '活动访问量'
    }
  ]
});

export const boardReducer = (state: BoardState = initialState(), action: IAction): BoardState => {
  switch (action.type) {
    // case getType(doGetBoardList.request):
    //   return update(state, {getBoardListParams:{ $set: action.payload} })
    // case getType(doGetBoardList.success):
    //   return update(state, {
    //     BoardList: { $set: action.payload }
    //   })
    default:
      return state;
  }
};
