import * as React from 'react';
import style from './AppHeader.module.less';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStoreState, IAction } from '@/types';
import { doChangeCollapsed } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Icon, Dropdown, Menu } from 'antd';
import { IUserInfo } from '@/api';

interface Props {
  doChangeCollapsed: (collapsed: boolean) => IAction;
  collapsed: boolean;
  userInfo: IUserInfo;
  alone?: boolean;
}

const AppHeader = ({ collapsed, doChangeCollapsed, userInfo, alone = false }: Props) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to='/project-list'>个人中心</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/login'>退出</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.wrapper}>
      {!alone && (
        <div className={style.headerLeft}>
          <button className={style.collapsedBtn} onClick={() => doChangeCollapsed(!collapsed)}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </button>
          <span className={style.title}>埋点管理平台</span>
        </div>
      )}
      <div className={style.navRight}>
        <Link to='/project-list'>我的看板</Link>

        <Link to='/project-list'>项目列表</Link>
        {userInfo.id ? (
          <Dropdown overlay={menu}>
            <a className='ant-dropdown-link' href='#'>
              {userInfo.nickname || userInfo.username} <Icon type='down' />
            </a>
          </Dropdown>
        ) : (
          [
            <Link key='login' to='/login'>
              登录
            </Link>,
            <Link key='signup' to='/signup'>
              注册
            </Link>
          ]
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doChangeCollapsed: (collapsed: boolean) => {
        return doChangeCollapsed(collapsed);
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { collapsed, userInfo } = state.app;
  return {
    collapsed,
    userInfo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader);
