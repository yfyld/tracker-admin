import RGL from 'react-grid-layout';
import * as React from 'react';

import BoardPane from './components/BoardPane';
import { connect } from 'react-redux';
import style from './Board.module.less';
import { IStoreState, IAction, IPageData, IDate } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { Icon, Button, Popover, Drawer } from 'antd';
import {
  IReportInfo,
  IBoardInfo,
  IBoardUpdateParam,
  IReportListParam,
  IReportAddParam,
  IReportAppendToBoard
} from '@/api';
import {
  doUpdateBoard,
  doGetReportList,
  doAddReport,
  doAppendReportToBoard,
  doChangeBoardGlobalDate
} from '@/store/actions';
import ReportDrawerContent from './components/ReportDrawerContent';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';

const ButtonGroup = Button.Group;

const ReactGridLayout = RGL.WidthProvider(RGL);

interface Props {
  reportList: IPageData<IReportInfo>;
  boardInfo: IBoardInfo;
  globalDate: IDate;
  addReport: (params: IReportAddParam) => IAction;
  onSave: (params: IBoardUpdateParam) => IAction;
  reportListParams: IReportListParam;
  onAppendReportToBoard: (params: IReportAppendToBoard) => IAction;
  getReportList: (params: IReportListParam) => IAction;
  onChangeBoardGlobalDate: (params: IDate) => IAction;
}

const BasicLayout = ({
  reportList,
  boardInfo,
  onSave,
  globalDate,
  reportListParams,
  getReportList,
  onAppendReportToBoard,
  onChangeBoardGlobalDate
}: Props) => {
  const [addReportDrawerVisible, setaddReportDrawerVisible] = React.useState(false);

  function generateDOM(reportList: IReportInfo[]) {
    return reportList.map(item => (
      <div key={item.id}>
        <BoardPane reportInfo={item} onDeletePane={handleDeletePane} />
      </div>
    ));
  }

  const handleDeletePane = (id: number) => {
    const newBoardInfo: IBoardInfo = JSON.parse(JSON.stringify(boardInfo));
    const index = newBoardInfo.reports.findIndex(item => item.id === id);
    if (index >= 0) {
      newBoardInfo.reports.splice(index, 1);
      onSave(newBoardInfo);
    }
  };

  function handleLayoutChange(layout: RGL.Layout[]) {
    const { id, projectId } = boardInfo;
    if (JSON.stringify(layout) === JSON.stringify(boardInfo.layout)) {
      return;
    }
    onSave({ id, projectId, layout });
  }

  function handleOpenReportDrawer() {
    if (reportList.list.length === 0) {
      getReportList({ page: 1, pageSize: 100, projectId: boardInfo.projectId });
    }
    setaddReportDrawerVisible(true);
  }

  function handleAppendSubmit(info: IReportAppendToBoard) {
    onAppendReportToBoard(info);
    setaddReportDrawerVisible(false);
  }

  const content = (
    <div>
      <div onClick={handleOpenReportDrawer}>添加已有报表</div>
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
        width={300}
        placement='right'
        closable={false}
        onClose={() => setaddReportDrawerVisible(false)}
        visible={addReportDrawerVisible}
      >
        <ReportDrawerContent
          onSearch={name => getReportList({ page: 1, pageSize: 100, projectId: boardInfo.projectId, name })}
          reportList={reportList}
          name={reportListParams.name}
          boardId={boardInfo.id}
          onSubmit={handleAppendSubmit}
        ></ReportDrawerContent>
      </Drawer>

      <div className={style.header}>
        <h2 className={style.title}>
          {boardInfo.name} <Icon type='edit' />
        </h2>
        <div className={style.btnBox}>
          <AnalyseRangePicker value={globalDate} onChange={onChangeBoardGlobalDate}></AnalyseRangePicker>
          <ButtonGroup>
            {/* <Button icon='save'></Button> */}
            <Button icon='calendar'></Button>

            <Popover placement='bottom' content={content} title='添加报表'>
              <Button type='primary' icon='plus'></Button>
            </Popover>
          </ButtonGroup>
        </div>
      </div>
      <div className={style.main}>
        <ReactGridLayout
          key={boardInfo.id}
          className='layout'
          layout={boardInfo.layout}
          onLayoutChange={handleLayoutChange}
          cols={24}
          rowHeight={30}
        >
          {generateDOM(boardInfo.reports)}
        </ReactGridLayout>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onSave: params => doUpdateBoard.request(params),
      onChangeBoardGlobalDate: params => doChangeBoardGlobalDate(params),
      onAppendReportToBoard: (params: IReportAppendToBoard) => {
        return doAppendReportToBoard.request(params);
      },
      getReportList: (params: IReportListParam) => doGetReportList.request(params)
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { boardInfo, globalDate } = state.board;
  const { reportList, reportListParams } = state.report;
  return {
    reportList,
    boardInfo,
    reportListParams,
    globalDate
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
