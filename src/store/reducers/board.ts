// import update from 'immutability-helper'
// import { getType } from 'typesafe-actions'
import { Action,BoardInfo,BoardPaneInfo} from '@/types'


export interface BoardState {
  boardInfo: BoardInfo
  boardPaneList:BoardPaneInfo[]
}

const initialState = (): BoardState => ({
  boardInfo:{
    id:null,
    name:null,
    layout:[
      {"x":0,"y":0,"w":8,"h":8,"i":"1"},
      {"x":0,"y":0,"w":8,"h":8,"i":"2"}
    ]
  },
  boardPaneList:[{
    id:1,
    name:"app访问量"
  },{
    id:2,
    name:"活动访问量"
  }]
})

export const boardReducer = (
  state: BoardState = initialState(),
  action: Action
): BoardState => {
  switch (action.type) {
    // case getType(doGetBoardList.request):
    //   return update(state, {getBoardListParams:{ $set: action.payload} })
    // case getType(doGetBoardList.success):
    //   return update(state, {
    //     BoardList: { $set: action.payload }
    //   })
    default:
      return state
  }
}
