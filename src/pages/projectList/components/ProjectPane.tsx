import * as React from 'react'
import style from './ProjectPane.module.less'
import { connect } from 'react-redux'
import { RootState, Action,ProjectInfo } from '@/types'
import { bindActionCreators, Dispatch } from 'redux'
import { Link } from 'react-router-dom';





interface Props {
  projectInfo: ProjectInfo
}

const ProjectPane = ({ projectInfo }: Props) => {
  return (
    <Link to={{
      pathname: `/project/${projectInfo.id}/event-analyse`,
      state: { fromDashboard: true }
    }}>
      <div className={style.wrapper}>
      <h3>{projectInfo.name}</h3>
    </div>
    </Link>
  )
}



const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {

    },
    dispatch
  )

const mapStateToProps = (state: RootState) => {
  //const { projectList } = state.project
  return {
   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPane)
