import RGL from 'react-grid-layout';
import * as React from 'react';

import BoardPane from './components/BoardPane';
import { connect } from 'react-redux';
import style from './Board.module.less';
import { IStoreState, IAction, IPageData } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { Icon, Button, Popover, Divider, Drawer, List, Input } from 'antd';
import { IReportInfo, IBoardInfo, IBoardUpdateParam } from '@/api';
import { doUpdateBoard } from '@/store/actions';
import ReportDrawerContent from './components/ReportDrawerContent';

const { Search } = Input;

const ButtonGroup = Button.Group;

const ReactGridLayout = RGL.WidthProvider(RGL);

interface Props {
  reportList: IPageData<IReportInfo>;
  boardInfo: IBoardInfo;
  handleSave: (params: IBoardUpdateParam) => IAction;
}

function generateDOM(reportList: IReportInfo[]) {
  return reportList.map(item => (
    <div key={item.id}>
      <BoardPane reportInfo={item} />
    </div>
  ));
}

const BasicLayout = ({ reportList, boardInfo, handleSave }: Props) => {
  const [addReportDrawerVisible, setaddReportDrawerVisible] = React.useState(false);
  function onLayoutChange(layout: RGL.Layout[]) {
    console.log(layout);
    const { id, projectId } = boardInfo;
    handleSave({ id, projectId, layout });
  }

  const content = (
    <div>
      <div onClick={() => setaddReportDrawerVisible(true)}>添加已有报表</div>
      <hr />
      <div>
        <Icon type='plus-circle' />
        新增报表
      </div>
    </div>
  );

  return (
    <div className={style.wrapper}>
      <Drawer
        title='报表列表'
        placement='right'
        closable={false}
        onClose={() => setaddReportDrawerVisible(false)}
        visible={addReportDrawerVisible}
      >
        <ReportDrawerContent reportList={reportList}></ReportDrawerContent>
      </Drawer>

      <div className='app-title'>
        <h2>
          {boardInfo.name} <Icon type='edit' />
        </h2>
        <div>
          <ButtonGroup>
            <Button icon='save'></Button>
            <Button icon='calendar'></Button>

            <Popover placement='bottom' content={content} title='添加报表'>
              <Button type='primary' icon='plus'></Button>
            </Popover>
          </ButtonGroup>
        </div>
      </div>
      <ReactGridLayout
        key={boardInfo.id}
        className='layout'
        layout={boardInfo.layout}
        onLayoutChange={onLayoutChange}
        cols={20}
        rowHeight={30}
      >
        {generateDOM(boardInfo.reportList)}
      </ReactGridLayout>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleSave: params => doUpdateBoard.request(params)
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { boardInfo } = state.board;
  const { reportList } = state.report;
  return {
    reportList,
    boardInfo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicLayout);
