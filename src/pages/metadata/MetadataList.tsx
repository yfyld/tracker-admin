import * as React from 'react'
import style from './MetadataList.module.less'
import { connect } from 'react-redux'
import {
  RootState,
  Action,
  PageData,
  MetadataInfo,
  GetMetadataListParams
} from '@/types'
import { doGetMetadataList } from '@/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import {  Table } from 'antd'
import { PaginationConfig, SorterResult, ColumnProps } from 'antd/lib/table';




interface Props {
  doGetMetadataList: (params: GetMetadataListParams) => Action
  metadataList: PageData<MetadataInfo>
}


const columns:ColumnProps<MetadataInfo>[] = [{
  key: 'code',
  title: 'Code',
  dataIndex: 'code',
  sorter: true,
  sortDirections: ['descend', 'ascend'],
},{
  key: 'name',
  title: '名称',
  dataIndex: 'name',
}, {
  key: 'tag',
  title: '标签',
  dataIndex: 'tag',
  filters: [{
    text: '前端埋点',
    value: 'aaa',
  }],
  filterMultiple: true,
  onFilter: (value:string, record:any) => record.tag.indexOf(value) === 0
},{
  key: 'status',
  title: '启用',
  dataIndex: 'status',
  filters: [{
    text: '启用',
    value: "1",
  },{
    text: '停用',
    value: "0",
  }],
  filterMultiple: false,
  onFilter: (value:string, record:any) => record.status.indexOf(value) === 0
},{
  key: 'desc',
  title: '描述',
  dataIndex: 'desc',
},];



function onChange(pagination:PaginationConfig, filters:Record<string | number | symbol, string[]>, sorter:SorterResult<any>) {
  console.log('params', pagination, filters, sorter);
}


const MetadataList = ({ metadataList, doGetMetadataList }: Props) => {
  return (
    <div className={style.wrapper}>
      <Table rowKey="id" columns={columns} dataSource={metadataList.list} onChange={onChange} />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      doGetMetadataList: params => {
        return doGetMetadataList.request(params)
      }
    },
    dispatch
  )

const mapStateToProps = (state: RootState) => {
  const { metadataList } = state.metadata
  return {
    metadataList
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetadataList)
