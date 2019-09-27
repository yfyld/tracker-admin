import { Menu, Icon } from 'antd'
import * as React from 'react'
import style from './AppSidebar.module.less'
import { RootState, IMenuItem } from '@/types'
import { connect } from 'react-redux'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ADD_BROAD } from '@/constants';

const SubMenu = Menu.SubMenu

interface Props extends RouteComponentProps {
  collapsed: boolean
  menuData: IMenuItem[]
}

const renderMenuItem = (data: IMenuItem) => {
  if (!data.children) {
    return (
      <Menu.Item key={data.key}>
        <Icon type={data.icon} />
        <span>{data.name}</span>
      </Menu.Item>
    )
  } else if (data.action===ADD_BROAD) {
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
    )
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
    )
  }
}

const AppSidebar = ({ collapsed, menuData, history }: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>logo</div>
      <Menu
        onClick={({ key }) => {
          if (/http/.test(key)) {
            window.open(key)
          } else {
            history.push(key)
          }
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {menuData.map(item => renderMenuItem(item))}
      </Menu>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  const { collapsed, menuData } = state.app
  return {
    collapsed,
    menuData
  }
}

export default withRouter(connect(mapStateToProps)(AppSidebar))
