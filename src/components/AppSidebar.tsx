import { Menu, Icon, Button } from 'antd';
import * as React from 'react';
import style from './AppSidebar.module.less';
import { IStoreState, IMenuItem, IAction } from '@/types';
import { connect } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ADD_BROAD } from '@/constants';
import { menuDataSelector } from '@/store/selectors';
import logo from '@/assets/imgs/logo.png';
import { bindActionCreators, Dispatch } from 'redux';
import { doAddBoard } from '@/store/actions';
import { IBoardAddParam } from '@/api';
import BoardAddModel from '@/pages/board/components/BoardAddModel';
const SubMenu = Menu.SubMenu;

interface Props extends RouteComponentProps {
  collapsed: boolean;
  menuData: IMenuItem[];
  onAddBoard: (param: IBoardAddParam) => IAction;
  projectId: number;
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

const AppSidebar = ({ collapsed, menuData, history, projectId, onAddBoard }: Props) => {
  const [addBoardVisible, setaddBoardVisible] = React.useState(false);
  return (
    <div className={style.wrapper + ' ' + (collapsed ? style.collapsed : '')}>
      <BoardAddModel
        onClose={setaddBoardVisible}
        visible={addBoardVisible}
        projectId={projectId}
        onSubmit={onAddBoard}
      ></BoardAddModel>
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
      <div className={style.footer}>
        <Button onClick={() => setaddBoardVisible(true)} type='primary' shape='round' icon='plus'>
          新增看板
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onAddBoard: (param: IBoardAddParam) => {
        return doAddBoard.request(param);
      }
    },
    dispatch
  );
const mapStateToProps = (state: IStoreState) => {
  const { collapsed } = state.app;
  const menuData = menuDataSelector(state);
  return {
    collapsed,
    projectId: state.project.projectInfo.id,
    menuData
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppSidebar));
