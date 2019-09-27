import * as React from 'react'
import style from './ProjectList.module.less'
import { connect } from 'react-redux'
import {
  RootState,
  Action,
  PageData,
} from '@/types'
import { doGetProjectList } from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { Tabs, Button } from 'antd'
import AppHeader from '@/components/AppHeader'
import ProjectPane from './components/ProjectPane'
import { IRole, IProjectListParam, IProjectInfo } from '@/api'

const TabPane = Tabs.TabPane

interface Props {
  doGetProjectList: (params: IProjectListParam) => Action
  projectList: PageData<IProjectInfo>
}



const ProjectList = ({ projectList, doGetProjectList }: Props) => {
  const operations=<Button size="small">新建项目</Button>
  return (
    <div className={style.wrapper}>
      <AppHeader alone />
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey={IRole.member}
        onChange={role => doGetProjectList({ role, page: 1, pageSize: 20 })}
      >
        <TabPane tab="所有项目" key={IRole.member}>
          {projectList.list.map(project => (
            <ProjectPane key={project.id} projectInfo={project} />
          ))}
        </TabPane>
        <TabPane tab="我的项目" key={IRole.admin}>
          {projectList.list.map(project => (
            <ProjectPane key={project.id} projectInfo={project} />
          ))}
        </TabPane>
        <TabPane tab="参与项目" key={IRole.developer}>
          {projectList.list.map(project => (
            <ProjectPane key={project.id} projectInfo={project} />
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
