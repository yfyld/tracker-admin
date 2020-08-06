import * as React from 'react';
import AppHeader from './AppHeader';
import style from './AdminLayout.module.less';
import { Menu } from 'antd';
import { ROUTE_PATH, PERMISSION_CODE } from '@/constants';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Permission from '@/components/Permission';
interface Props extends RouteComponentProps {
  children: React.ReactElement;
}

const AdminLayout = ({ children, history, location }: Props) => {
  console.log(location.pathname);
  const handleMenuClick = (path: string) => {
    history.push(path);
  };

  const selectedKey = location.pathname === '/admin' ? ROUTE_PATH.userManage : location.pathname;

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <AppHeader alone />
      </div>
      <div className={style.menu}>
        <Menu selectedKeys={[selectedKey]} onClick={({ key }) => handleMenuClick(key)}>
          <Permission code={PERMISSION_CODE.PROJECT_ADD} key={ROUTE_PATH.userManage}>
            <Menu.Item>账号管理</Menu.Item>
          </Permission>
          <Permission code={PERMISSION_CODE.PROJECT_ADD} key={ROUTE_PATH.roleManage}>
            <Menu.Item>角色管理</Menu.Item>
          </Permission>
          <Permission code={PERMISSION_CODE.PROJECT_ADD} key={ROUTE_PATH.permissionManage}>
            <Menu.Item>权限管理</Menu.Item>
          </Permission>
        </Menu>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default withRouter(AdminLayout);
