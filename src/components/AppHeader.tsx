import * as React from 'react'
import style from './AppHeader.module.less'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState, Action } from '@/types'
import { doChangeCollapsed } from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { Icon } from 'antd'

interface Props {
  doChangeCollapsed: (collapsed: boolean) => Action
  collapsed: boolean
  alone?:boolean
}

const AppHeader = ({ collapsed, doChangeCollapsed,alone=false }: Props) => {
  return (
    <div className={style.wrapper}>
      {!alone&&<div className={style.headerLeft}>
        <button
          className={style.collapsedBtn}
          onClick={() => doChangeCollapsed(!collapsed)}
        >
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </button>
        <span className={style.title}>埋点管理平台</span>
      </div>}
      <div className={style.navRight}>
        <Link to="/projectList">项目列表</Link>
        <Link to="/login">登录</Link>
        <Link to="/signup">注册</Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      doChangeCollapsed: (collapsed: boolean) => {
        return doChangeCollapsed(collapsed)
      }
    },
    dispatch
  )

const mapStateToProps = (state: RootState) => {
  const { collapsed } = state.app
  return {
    collapsed
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader)
