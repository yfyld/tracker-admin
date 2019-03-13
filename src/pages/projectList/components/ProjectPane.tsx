import * as React from 'react'
import style from './ProjectPane.module.less'
import { connect } from 'react-redux'
import { RootState, Action,ProjectInfo } from '@/types'
import { bindActionCreators, Dispatch } from 'redux'





interface Props {
  projectInfo: ProjectInfo
}

const ProjectPane = ({ projectInfo }: Props) => {
  return (
    <div className={style.wrapper}>
      <h3>{projectInfo.name}</h3>
    </div>
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
