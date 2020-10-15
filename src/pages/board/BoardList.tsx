import * as React from 'react';
import style from './BoardList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IPageData } from '@/types';

import { Select, Pagination } from 'antd';

import BoardPane from './components/BoardPane';
import { IBoardInfo, IBoardListParam, IBoardListItem } from '@/api';

import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doGetBoardList } from '@/store/actions';

// import MyBoardForm from './components/MyBoardForm';

interface Props {
  boardList: IPageData<IBoardListItem>;
  boardListParams: IBoardListParam;
  onGetBoardList: (param: IBoardListParam) => IAction;
}

const BoardList = ({ boardList, onGetBoardList, boardListParams }: Props) => {
  const { Option } = Select;
  const [selectBoardType, setSelectBoardType] = React.useState(0);
  function handleSelectChange(value: number) {
    setSelectBoardType(value);
    onGetBoardList({ ...boardListParams, type: value });
  }
  return (
    <div className={style.wrapper}>
      <div className={style.selectBox}>
        {/* <MyBoardForm
          defaultValue={{ ...boardListParams, type: selectBoardType }}
          onSubmit={onGetBoardList}
        ></MyBoardForm> */}
        <Select style={{ width: 200 }} defaultValue={selectBoardType} onChange={handleSelectChange}>
          <Option value={0}>所有看板</Option>
          <Option value={1}>我创建的看板</Option>
        </Select>
      </div>
      <div className={style.listBox}>
        {boardList.list.map((board) => (
          <BoardPane key={board.id} boardInfo={board} />
        ))}
      </div>
      <Pagination
        onChange={(page, pageSize) => onGetBoardList({ ...boardListParams, page, pageSize })}
        pageSize={boardListParams.pageSize}
        current={boardListParams.page}
        total={boardList.totalCount}
      />
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { boardList, boardListParams } = state.board;
  return {
    boardList,
    boardListParams
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetBoardList: (params: IBoardListParam) => {
        return doGetBoardList.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);
