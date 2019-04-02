import * as RGL from 'react-grid-layout'
import * as React from 'react'
import * as _ from 'lodash'
import BoardPane from './components/BoardPane'
import { connect } from 'react-redux'
import style from './Board.module.less'
import { RootState, Action,BoardPaneInfo, BoardInfo } from '@/types'
import { bindActionCreators, Dispatch } from 'redux'
import { Icon } from '_antd@3.16.1@antd';

const ReactGridLayout = RGL.WidthProvider(RGL)

interface Props {
  boardPaneList: BoardPaneInfo[]
  boardInfo: BoardInfo
  onLayoutChange: (param: any) => {}
}

function generateDOM(boardPaneList: BoardPaneInfo[]) {
  return boardPaneList.map(item => (
    <div key={item.id}>
      <BoardPane info={item} />
    </div>
  ))
}

function onLayoutChange1(a:RGL.Layout[]){
  console.log(a)
}

const BasicLayout = ({ boardPaneList, boardInfo, onLayoutChange }: Props) => {
  return (
    <div className={style.wrapper}>
      <div className="app-title">
        <h2>
          老板看板 <Icon type="edit" />
        </h2>
        <div>
          <Icon type="save" />
        </div>
      </div>
      <ReactGridLayout
        className="layout"
        layout={boardInfo.layout}
        onLayoutChange={onLayoutChange1}
        cols={20}
        rowHeight={30}
      >
        {generateDOM(boardPaneList)}
      </ReactGridLayout>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators({}, dispatch)

const mapStateToProps = (state: RootState) => {
  const { boardInfo, boardPaneList } = state.board
  return {
    boardPaneList,
    boardInfo
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicLayout)
