import * as React from 'react';
import { Popover, Select, Button, message } from 'antd';
import { IAction, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IBoardList, IReportInfo, IReportAppendToBoard } from '@/api';
import { doAppendReportToBoard } from '@/store/actions';

interface Props {
  boardList: IBoardList;
  reportInfo: IReportInfo;
  onAppendReportToBoard: (param: IReportAppendToBoard) => IAction;
  children: React.ReactNode;
}

const ReportAppendBoard = ({ onAppendReportToBoard, boardList, reportInfo, children }: Props) => {
  const [appendedBoardIds, setappendedBoardIds] = React.useState([]);

  function handleReportAppendBoard(record: IReportInfo) {
    if (!appendedBoardIds.length) {
      message.info('请选择看板');
      return;
    }
    onAppendReportToBoard({ reportId: record.id, boardIds: appendedBoardIds, projectId: reportInfo.projectId });
  }

  return (
    <Popover
      placement='bottom'
      trigger='click'
      onVisibleChange={(value) => value && setappendedBoardIds([])}
      content={
        <div>
          <Select
            size='small'
            onChange={(e: number[]) => setappendedBoardIds(e)}
            value={appendedBoardIds}
            style={{ width: 240 }}
            mode='multiple'
          >
            {boardList.list.map((item) => {
              const isExist = !!reportInfo.boards.find((val) => val.id === item.id);
              return (
                <Select.Option key={item.id} value={item.id} disabled={isExist}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
          &nbsp;
          <Button size='small' onClick={() => handleReportAppendBoard(reportInfo)}>
            确定
          </Button>
        </div>
      }
      title='选择看板'
    >
      {children}
    </Popover>
  );
};
const mapStateToProps = (state: IStoreState) => {
  const { boardList } = state.board;
  return {
    boardList
  };
};
const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onAppendReportToBoard: (params: IReportAppendToBoard) => {
        return doAppendReportToBoard.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReportAppendBoard);
