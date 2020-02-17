import * as React from 'react';
import AppHeader from './AppHeader';
import style from './AdminLayout.module.less';
import { Menu } from 'antd';
import { ROUTE_PATH } from '@/constants';
import { withRouter, RouteComponentProps } from 'react-router-dom';
interface Props extends RouteComponentProps {
  children: any;
}

const AdminLayout = ({ children, history, location }: Props) => {
  console.log(location.pathname);
  const handleMenuClick = (path: string) => {
    history.push(path);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <AppHeader alone />
      </div>
      <div className={style.menu}>
        <Menu selectedKeys={[location.pathname]} onClick={({ key }) => handleMenuClick(key)}>
          <Menu.Item key={ROUTE_PATH.userManage}>账号管理</Menu.Item>
          <Menu.Item key={ROUTE_PATH.roleManage}>角色管理</Menu.Item>
          <Menu.Item key={ROUTE_PATH.permissionManage}>权限管理</Menu.Item>
        </Menu>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default withRouter(AdminLayout);
