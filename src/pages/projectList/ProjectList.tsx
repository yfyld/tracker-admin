import * as React from 'react'
import style from './ProjectList.module.less'
import { connect } from 'react-redux'
import {
  RootState,
  Action,
  GetProjectListParams,
  PageData,
  ProjectInfo
} from '@/types'
import { doGetProjectList } from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { Tabs } from 'antd'
import AppHeader from '@/components/AppHeader'
import ProjectPane from './components/ProjectPane'

const TabPane = Tabs.TabPane

interface Props {
  doGetProjectList: (params: GetProjectListParams) => Action
  projectList: PageData<ProjectInfo>
}

const ProjectList = ({ projectList, doGetProjectList }: Props) => {
  return (
    <div className={style.wrapper}>
      <AppHeader alone />
      <Tabs
        onChange={role => doGetProjectList({ role, page: 1, pageSize: 20 })}
      >
        <TabPane tab="所有项目" key="ALL">
          {projectList.list.map(project => (
            <ProjectPane projectInfo={project} />
          ))}
        </TabPane>
        <TabPane tab="我的项目" key="ADMIN">
          {projectList.list.map(project => (
            <ProjectPane projectInfo={project} />
          ))}
        </TabPane>
        <TabPane tab="参与项目" key="MEMBER">
          {projectList.list.map(project => (
            <ProjectPane projectInfo={project} />
          ))}
        </TabPane>
      </Tabs>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      doGetProjectList: params => {
        return doGetProjectList.request(params)
      }
    },
    dispatch
  )

const mapStateToProps = (state: RootState) => {
  const { projectList } = state.project
  return {
    projectList
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList)
