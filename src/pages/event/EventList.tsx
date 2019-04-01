import * as React from 'react'
import style from './EventList.module.less'
import { connect } from 'react-redux'
import {
  RootState,
  Action,
  GetProjectListParams,
  PageData,
  ProjectInfo,
  EventInfo
} from '@/types'
import { doGetProjectList } from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import {  Table } from 'antd'
import { PaginationConfig, SorterResult, ColumnProps } from 'antd/lib/table';




interface Props {
  doGetProjectList: (params: GetProjectListParams) => Action
  projectList: PageData<ProjectInfo>
}


const columns:ColumnProps<EventInfo>[] = [{
  key: 'name',
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Address',
  dataIndex: 'name',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
  filterMultiple: false,
  onFilter: (value:string, record:any) => record.address.indexOf(value) === 0,
  sorter: (a:any, b:any) => a.address.length - b.address.length,
  sortDirections: ['descend', 'ascend'],
}];

const data:EventInfo[] = [{
  id: 1,
  name: 'John Brown'
}, {
  id: 2,
  name: 'Jim Green'
}];

function onChange(pagination:PaginationConfig, filters:Record<string | number | symbol, string[]>, sorter:SorterResult<any>) {
  console.log('params', pagination, filters, sorter);
}


const EventList = ({ projectList, doGetProjectList }: Props) => {
  return (
    <div className={style.wrapper}>
      <Table columns={columns} dataSource={data} onChange={onChange} />
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
)(EventList)
