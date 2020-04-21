import RGL from 'react-grid-layout';
import * as React from 'react';

import BoardGridPane from './components/BoardGridPane';
import { connect } from 'react-redux';
import style from './Board.module.less';
import { IStoreState, IAction, IPageData, IDate, IDeleteParam } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { Icon, Button, Popover, Drawer, Modal, message } from 'antd';
import {
  IReportInfo,
  IBoardInfo,
  IBoardUpdateParam,
  IReportListParam,
  IReportAddParam,
  IReportAppendToBoard,
  IReportUpdateParam
} from '@/api';
import {
  doUpdateBoard,
  doGetReportList,
  doAddReport,
  doAppendReportToBoard,
  doChangeBoardGlobalDate,
  doDeleteBoard,
  doUpdateReport
} from '@/store/actions';
import ReportDrawerContent from './components/ReportDrawerContent';
import AnalyseRangePicker from '@/components/AnalyseRangePicker';
import ReportUpdateModel from './components/ReportUpdateModel';
const { confirm } = Modal;
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
  onGetReportList: (params: IReportListParam) => IAction;
  onChangeBoardGlobalDate: (params: IDate) => IAction;
  onDeleteBoard: (params: IDeleteParam) => IAction;
  onUpdateReport: (params: IReportUpdateParam) => IAction;
}

const BasicLayout = ({
  reportList,
  boardInfo,
  onSave,
  globalDate,
  reportListParams,
  onGetReportList,
  onAppendReportToBoard,
  onChangeBoardGlobalDate,
  onDeleteBoard,
  onUpdateReport
}: Props) => {
  const [addReportDrawerVisible, setaddReportDrawerVisible] = React.useState(false);
  const [refresh, setrefresh] = React.useState(1);
  const [updateReportModelVisible, setupdateReportModelVisible] = React.useState(false);
  const [curReportInfo, setcurReportInfo] = React.useState<IReportInfo>(null);

  const [layout, setlayout] = React.useState(boardInfo.layout);

  React.useEffect(() => {
    setlayout(boardInfo.layout);
  }, [boardInfo]);

  function generateDOM(reportList: IReportInfo[]) {
    return reportList.map((item) => (
      <div key={item.id}>
        <BoardGridPane
          onSetPane={handlePaneUpdate}
          refresh={refresh}
          globalDate={globalDate}
          reportInfo={item}
          onDeletePane={handleDeletePane}
        />
      </div>
    ));
  }

  const handleDeletePane = (id: number) => {
    const newBoardInfo: IBoardInfo = JSON.parse(JSON.stringify(boardInfo));

    const index = newBoardInfo.reports.findIndex((item) => item.id === id);
    if (index >= 0) {
      newBoardInfo.reports.splice(index, 1);
      onSave(newBoardInfo);
    }
  };

  function handleLayoutChange(layout: RGL.Layout[]) {
    setlayout(layout);
    //onSave({ id, projectId, layout });
  }

  function handleSave() {
    const { id, projectId } = boardInfo;
    if (JSON.stringify(layout) === JSON.stringify(boardInfo.layout)) {
      message.info('当前布局未修改');
      return;
    }
    onSave({ id, projectId, layout });
  }

  function handleOpenReportDrawer() {
    if (reportList.list.length === 0) {
      onGetReportList({ page: 1, pageSize: 100, projectId: boardInfo.projectId });
    }
    setaddReportDrawerVisible(true);
  }

  function handleAppendSubmit(info: IReportAppendToBoard) {
    onAppendReportToBoard(info);
    setaddReportDrawerVisible(false);
  }

  function handleDelete() {
    const { id, projectId } = boardInfo;
    confirm({
      title: '提示',
      content: '确认删除该看板',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        onDeleteBoard({ id, projectId });
      }
    });
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

  const handleReportUpdateSubmit = (param: IReportUpdateParam) => {
    onUpdateReport(param);
  };
  function handlePaneUpdate(info: IReportInfo) {
    setupdateReportModelVisible(true);
    setcurReportInfo(info);
  }
  return (
    <div className={style.wrapper}>
      {curReportInfo && (
        <ReportUpdateModel
          orginInfo={curReportInfo}
          visible={updateReportModelVisible}
          onClose={setupdateReportModelVisible}
          onSubmit={handleReportUpdateSubmit}
        ></ReportUpdateModel>
      )}
      <Drawer
        title='报表列表'
        width={300}
        placement='right'
        closable={false}
        onClose={() => setaddReportDrawerVisible(false)}
        visible={addReportDrawerVisible}
      >
        <ReportDrawerContent
          onSearch={(name) => onGetReportList({ page: 1, pageSize: 100, projectId: boardInfo.projectId, name })}
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
          <AnalyseRangePicker
            defalutShowIcon
            value={globalDate}
            onChange={onChangeBoardGlobalDate}
          ></AnalyseRangePicker>
          &nbsp;
          <ButtonGroup>
            <Button icon='save' onClick={handleSave}></Button>
            <Button icon='delete' onClick={handleDelete}></Button>
            <Button icon='reload' onClick={() => setrefresh(refresh + 1)}></Button>
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
          layout={layout}
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
      onSave: (params) => doUpdateBoard.request(params),
      onChangeBoardGlobalDate: (params) => doChangeBoardGlobalDate(params),
      onAppendReportToBoard: (params: IReportAppendToBoard) => {
        return doAppendReportToBoard.request(params);
      },
      onUpdateReport: (params: IReportUpdateParam) => doUpdateReport.request(params),
      onGetReportList: (params: IReportListParam) => doGetReportList.request(params),
      onDeleteBoard: (params) => doDeleteBoard.request(params)
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
