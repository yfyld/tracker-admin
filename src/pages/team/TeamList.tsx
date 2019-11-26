import * as React from 'react';
import style from './TeamList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction } from '@/types';
import { doGetTeamList, doAddTeam, doDeleteTeam, doGetUserList, doUpdateTeam } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Modal, List, Avatar, Skeleton, Button, Icon, Popconfirm } from 'antd';
import {
  ITeamInfo,
  ITeamListParam,
  ITeamList,
  IUserListParam,
  ITeamAddParam,
  IUserList,
  ITeamUpdateParam,
  IUserInfo
} from '@/api';
import AvatarText from '@/components/AvatarText';
import TeamAddModal from './components/TeamAddModal';
import TeamUpdateModal from './components/TeamUpdateModal';
import TeamListForm from './components/TeamListForm';
import { ROUTE_PATH } from '@/constants';
import { Link } from 'react-router-dom';

interface Props {
  onGetTeamList: (param: ITeamListParam) => IAction;
  onGetUserList: (param: IUserListParam) => IAction;
  onAddTeam: (param: ITeamAddParam) => IAction;
  onUpdateTeam: (param: ITeamUpdateParam) => IAction;
  userList: IUserList;
  teamList: ITeamList;
  teamListLoading: boolean;
  teamListParam: ITeamListParam;
  onDeleteTeam: (id: number) => IAction;
  userInfo: IUserInfo;
}

const TeamList = ({
  onGetTeamList,
  teamList,
  teamListLoading,
  onGetUserList,
  userList,
  onAddTeam,
  onDeleteTeam,
  onUpdateTeam,
  teamListParam,
  userInfo
}: Props) => {
  const [addTeamVisible, setaddTeamVisible] = React.useState(false);
  const [updateTeamVisible, setupdateTeamVisible] = React.useState(false);
  const [selectedTeam, setselectedTeam] = React.useState<ITeamInfo>({
    name: '',
    description: '',
    creator: {
      id: null,
      nickname: '',
      username: ''
    },
    members: [],
    id: null,
    public: false
  });

  const handleUpdateTeam = (info: ITeamInfo) => {
    setselectedTeam(info);
    setupdateTeamVisible(true);
  };
  return (
    <div className={style.wrapper}>
      <TeamAddModal
        onSearchUser={onGetUserList}
        userList={userList}
        visible={addTeamVisible}
        onClose={setaddTeamVisible}
        onSubmit={onAddTeam}
      ></TeamAddModal>
      <TeamUpdateModal
        orginInfo={selectedTeam}
        onSearchUser={onGetUserList}
        userList={userList}
        visible={updateTeamVisible}
        onClose={setupdateTeamVisible}
        onSubmit={onUpdateTeam}
      ></TeamUpdateModal>

      <div className={style.header}>
        <div className='app-fl'>
          <TeamListForm defaultValue={teamListParam} onSubmit={onGetTeamList}></TeamListForm>
        </div>
        <Button type='primary' className='app-fr' onClick={() => setaddTeamVisible(true)}>
          新建团队
        </Button>
      </div>
      <List
        className={style.itemList}
        itemLayout='horizontal'
        dataSource={teamList.list}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={
              userInfo.id === item.creator.id && [
                <a key='list-edit' onClick={() => handleUpdateTeam(item)}>
                  <Icon type='form' />
                  编辑
                </a>,
                <Popconfirm
                  key='list-delete'
                  onConfirm={() => onDeleteTeam(item.id)}
                  title='团队删除后不可恢复,确定要删除?'
                  okText='删除'
                  cancelText='取消'
                >
                  <a>
                    <Icon type='delete' />
                    删除
                  </a>
                </Popconfirm>
              ]
            }
          >
            <List.Item.Meta
              avatar={<AvatarText info={item.creator} />}
              title={<Link to={ROUTE_PATH.teamInfo + '?teamId=' + item.id}>{item.name}</Link>}
              description={item.description}
            />
            <div className={style.memberBox}>
              {item.members.map(member => (
                <AvatarText key={member.id} size='mini' color='#999' info={member} />
              ))}
            </div>
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
      },
      onGetUserList: param => {
        return doGetUserList.request(param);
      },
      onAddTeam: param => {
        return doAddTeam.request(param);
      },
      onDeleteTeam: param => {
        return doDeleteTeam.request(param);
      },
      onUpdateTeam: param => {
        return doUpdateTeam.request(param);
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { teamList, teamListLoading, teamListParam } = state.team;
  const { userList, userInfo } = state.app;
  return {
    teamList,
    userInfo,
    userList,
    teamListLoading,
    teamListParam
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
