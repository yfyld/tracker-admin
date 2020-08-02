import * as React from 'react';
import style from './AppHeader.module.less';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStoreState, IAction } from '@/types';
import { doChangeCollapsed, doResetStore, doLogout } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Icon, Dropdown, Menu } from 'antd';
import { IUserInfo, IProjectInfo } from '@/api';
import logo2 from '@/assets/imgs/logo2.png';
import ProjectInfo from '@/pages/project/components/ProjectInfo';
import { ClickParam } from 'antd/lib/menu';
import Permission from './Permission';
import { PERMISSION_CODE } from '@/constants';

interface Props {
  onChangeCollapsed: (collapsed: boolean) => IAction;
  onLogout: () => IAction;
  projectInfo: IProjectInfo;
  collapsed: boolean;
  userInfo: IUserInfo;
  alone?: boolean;
}

const AppHeader = ({ collapsed, onChangeCollapsed, userInfo, alone = false, projectInfo, onLogout }: Props) => {
  const handleMenuClick = ({ key }: ClickParam) => {
    if (key === 'SINGOUT') {
      onLogout();
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key=''>
        <Link to='/project-list'>个人中心</Link>
      </Menu.Item>
      <Menu.Item key='SINGOUT'>退出</Menu.Item>
    </Menu>
  );

  return (
    <div className={style.wrapper}>
      {alone ? (
        <div className={style.logo}>
          <img src={logo2} alt='' />
        </div>
      ) : (
        <div className={style.headerLeft}>
          <button className={style.collapsedBtn} onClick={() => onChangeCollapsed(!collapsed)}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </button>
          <span className={style.title}>{projectInfo.name}</span>
        </div>
      )}
      <div className={style.navRight}>
        {userInfo.id
          ? [
              <Permission key='borad' code={PERMISSION_CODE.ROUTE_BOARD_LIST}>
                <Link to='/my-board'>我的看板</Link>
              </Permission>,
              // <Link key='team' to='/team-list'>
              //   团队
              // </Link>,

              <Permission key='project' code={PERMISSION_CODE.ROUTE_PROJECT_LIST}>
                <Link to='/project-list'>应用列表</Link>
              </Permission>,

              <Permission key='seting' code={PERMISSION_CODE.ROUTE_SETTING}>
                <Link to='/admin/user-manage'>设置</Link>
              </Permission>,

              <Dropdown key='menu' overlay={menu}>
                <a className='ant-dropdown-link' href='#'>
                  {userInfo.nickname || userInfo.username} <Icon type='down' />
                </a>
              </Dropdown>
            ]
          : [
              <Link key='login' to='/login'>
                登录
              </Link>,
              <Link key='signup' to='/signup'>
                注册
              </Link>
            ]}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onChangeCollapsed: (collapsed: boolean) => {
        return doChangeCollapsed(collapsed);
      },
      onLogout: () => {
        return doLogout.request();
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { collapsed, userInfo } = state.app;
  const { projectInfo } = state.project;
  return {
    collapsed,
    projectInfo,
    userInfo
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
