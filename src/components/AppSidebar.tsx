import { Menu, Icon } from 'antd';
import * as React from 'react';
import style from './AppSidebar.module.less';
import { IStoreState, IMenuItem } from '@/types';
import { connect } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ADD_BROAD } from '@/constants';
import { menuDataSelector } from '@/store/selectors';
import logo from '@/assets/imgs/logo.png';
const SubMenu = Menu.SubMenu;

interface Props extends RouteComponentProps {
  collapsed: boolean;
  menuData: IMenuItem[];
}

const renderMenuItem = (data: IMenuItem) => {
  if (!data.children) {
    return (
      <Menu.Item key={data.key}>
        <Icon type={data.icon} />
        <span>{data.name}</span>
      </Menu.Item>
    );
  } else if (data.action === ADD_BROAD) {
    return (
      <SubMenu
        key={data.key}
        title={
          <span>
            <Icon type={data.icon} />
            <span>{data.name}</span>
          </span>
        }
      >
        {data.children.map(item => renderMenuItem(item))}
      </SubMenu>
    );
  } else {
    return (
      <SubMenu
        key={data.key}
        title={
          <span>
            <Icon type={data.icon} />
            <span>{data.name}</span>
          </span>
        }
      >
        {data.children.map(item => renderMenuItem(item))}
      </SubMenu>
    );
  }
};

const AppSidebar = ({ collapsed, menuData, history }: Props) => {
  return (
    <div className={style.wrapper + ' ' + (collapsed ? style.collapsed : '')}>
      <div className={style.logo}>
        <img src={logo} alt='' />
      </div>
      <Menu
        onClick={({ key }) => {
          if (/http/.test(key)) {
            window.open(key);
          } else {
            history.push(key);
          }
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
        inlineCollapsed={collapsed}
      >
        {menuData.map(item => renderMenuItem(item))}
      </Menu>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { collapsed } = state.app;
  const menuData = menuDataSelector(state);
  return {
    collapsed,
    menuData
  };
};

export default withRouter(connect(mapStateToProps)(AppSidebar));
