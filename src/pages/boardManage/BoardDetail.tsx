import RGL from 'react-grid-layout';
import * as React from 'react';

import { connect } from 'react-redux';
import style from './BoardDetail.module.less';
import { IStoreState, IAction, IPageData, IDate } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { Icon, Button } from 'antd';
import { IReportInfo, IBoardInfo, IReportListParam } from '@/api';
import { doGetReportList, doChangeBoardGlobalDate } from '@/store/actions';

import AnalyseRangePicker from '@/components/AnalyseRangePicker';
import BoardGridPane from '../board/components/BoardGridPane';

const ButtonGroup = Button.Group;

const ReactGridLayout = RGL.WidthProvider(RGL);

interface Props {
  reportList: IPageData<IReportInfo>;
  boardInfo: IBoardInfo;
  globalDate: IDate;
  reportListParams: IReportListParam;
  getReportList: (params: IReportListParam) => IAction;
  onChangeBoardGlobalDate: (params: IDate) => IAction;
}

const BasicLayout = ({ boardInfo, globalDate, onChangeBoardGlobalDate }: Props) => {
  function generateDOM(reportList: IReportInfo[]) {
    return reportList.map(item => (
      <div key={item.id}>
        <BoardGridPane globalDate={globalDate} reportInfo={item} editable={false} />
      </div>
    ));
  }

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h2 className={style.title}>{boardInfo.name}</h2>
        <div className={style.btnBox}>
          {globalDate.dateStart ? (
            <AnalyseRangePicker value={globalDate} onChange={onChangeBoardGlobalDate}></AnalyseRangePicker>
          ) : (
            <ButtonGroup>
              <Button icon='calendar'></Button>
            </ButtonGroup>
          )}
        </div>
      </div>
      <div className={style.main}>
        <ReactGridLayout
          key={boardInfo.id}
          className='layout'
          isDraggable={false}
          isResizable={false}
          layout={boardInfo.layout}
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
      onChangeBoardGlobalDate: params => doChangeBoardGlobalDate(params),

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
