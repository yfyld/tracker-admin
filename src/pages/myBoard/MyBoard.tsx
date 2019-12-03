import * as React from 'react';
import style from './MyBoard.module.less';
import { connect } from 'react-redux';
import { IStoreState, IPageData } from '@/types';

import { Select, Pagination } from 'antd';
import AppHeader from '@/components/AppHeader';
import BoardPane from './components/BoardPane';
import { IMyBoardListItem, IMyBoardListParam } from '@/api';

import { IAction } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { doGetMyBoardList } from '@/store/actions';

import MyBoardForm from './components/MyBoardForm';

interface Props {
  myBoardList: IPageData<IMyBoardListItem>;
  myBoardListParams: IMyBoardListParam;
  onGetMyBoardList: (param: IMyBoardListParam) => IAction;
}

const MyBoard = ({ myBoardList, onGetMyBoardList, myBoardListParams }: Props) => {
  const { Option } = Select;
  const [selectBoardType, setSelectBoardType] = React.useState(0);
  function handleSelectChange(value: number) {
    setSelectBoardType(value);
    onGetMyBoardList({ ...myBoardListParams, type: value });
  }
  return (
    <div className={style.wrapper}>
      <div className={style.selectBox}>
        <MyBoardForm
          defaultValue={{ ...myBoardListParams, type: selectBoardType }}
          onSubmit={onGetMyBoardList}
        ></MyBoardForm>
        <Select style={{ width: 200 }} defaultValue={selectBoardType} onChange={handleSelectChange}>
          <Option value={0}>所有看板</Option>
          <Option value={1}>我创建的看板</Option>
        </Select>
      </div>
      <div className={style.listBox}>
        {myBoardList.list.map(board => (
          <BoardPane key={board.id} boardInfo={board} />
        ))}
      </div>
      <Pagination
        onChange={(page, pageSize) => onGetMyBoardList({ ...myBoardListParams, page, pageSize })}
        pageSize={myBoardListParams.pageSize}
        current={myBoardListParams.page}
        total={myBoardList.totalCount}
      />
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { myBoardList, myBoardListParams } = state.board;
  return {
    myBoardList,
    myBoardListParams
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetMyBoardList: (params: IMyBoardListParam) => {
        return doGetMyBoardList.request(params);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyBoard);
