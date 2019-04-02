import * as React from 'react'
import style from './BoardPane.module.less'
import { connect } from 'react-redux'
import { RootState, Action } from '@/types'
import { bindActionCreators, Dispatch } from 'redux'



interface Props {
  info: any
}

const BoardPane = ({ info }: Props) => {
  return (
    <div className={style.wrapper}>
      <h3>{info.name}</h3>
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
)(BoardPane)
