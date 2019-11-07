import RGL from 'react-grid-layout';
import * as React from 'react';

import BoardPane from './components/BoardPane';
import { connect } from 'react-redux';
import style from './Board.module.less';
import { IStoreState, IAction, IPageData } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { Icon, Button, Popover, Drawer } from 'antd';
import { IReportInfo, IBoardInfo, IBoardUpdateParam, IReportListParam, IReportAddParam } from '@/api';
import { doUpdateBoard, doGetReportList, doAddReport } from '@/store/actions';
import ReportDrawerContent from './components/ReportDrawerContent';

const ButtonGroup = Button.Group;

const ReactGridLayout = RGL.WidthProvider(RGL);

interface Props {
  reportList: IPageData<IReportInfo>;
  boardInfo: IBoardInfo;
  addReport: (params: IReportAddParam) => IAction;
  handleSave: (params: IBoardUpdateParam) => IAction;
  reportListParams: IReportListParam;
  getReportList: (params: IReportListParam) => IAction;
}

function generateDOM(reportList: IReportInfo[]) {
  return reportList.map(item => (
    <div key={item.id}>
      <BoardPane reportInfo={item} />
    </div>
  ));
}

const BasicLayout = ({ reportList, boardInfo, handleSave, reportListParams, getReportList, addReport }: Props) => {
  const [addReportDrawerVisible, setaddReportDrawerVisible] = React.useState(false);
  function onLayoutChange(layout: RGL.Layout[]) {
    console.log(layout);
    const { id, projectId } = boardInfo;
    handleSave({ id, projectId, layout });
  }

  function handleOpenReportDrawer() {
    if (reportList.list.length === 0) {
      getReportList({ page: 1, pageSize: 100, projectId: boardInfo.projectId });
    }
    setaddReportDrawerVisible(true);
  }

  function handleAppendSubmit(info: IReportAddParam) {
    addReport(info);
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
        cols={24}
        rowHeight={30}
      >
        {generateDOM(boardInfo.reports)}
      </ReactGridLayout>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      handleSave: params => doUpdateBoard.request(params),
      addReport: (params: IReportAddParam) => {
        return doAddReport.request(params);
      },
      getReportList: (params: IReportListParam) => doGetReportList.request(params)
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { boardInfo } = state.board;
  const { reportList, reportListParams } = state.report;
  return {
    reportList,
    boardInfo,
    reportListParams
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicLayout);
