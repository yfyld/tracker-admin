import * as React from 'react';
import style from './TeamList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction } from '@/types';
import { doGetTeamList, doAddTeam, doDeleteTeam } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Modal, List, Avatar, Skeleton } from 'antd';
import { ITeamInfo, ITeamListParam, ITeamList } from '@/api';

const { confirm } = Modal;
interface Props {
  onGetTeamList: (param: ITeamListParam) => IAction;
  teamList: ITeamList;
}

const TeamList = ({ onGetTeamList, teamList }: Props) => {
  function handleTeamDelete(record: ITeamInfo) {
    confirm({
      title: '提示',
      content: `确定要删除"${record.name}"`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {}
    });
  }

  const initLoading = false;

  return (
    <div className={style.wrapper}>
      <List
        className='demo-loadmore-list'
        loading={initLoading}
        itemLayout='horizontal'
        dataSource={teamList.list}
        renderItem={item => (
          <List.Item actions={[<a key='list-loadmore-edit'>edit</a>, <a key='list-loadmore-more'>more</a>]}>
            <Skeleton avatar title={false} loading={true} active>
              <List.Item.Meta
                avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                title={<a href='https://ant.design'>{11111}</a>}
                description='Ant Design, a design language for background applications, is refined by Ant UED Team'
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetTeamList: params => {
        return doGetTeamList.request(params);
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { teamList } = state.team;

  return {
    teamList
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
