import { Table } from 'antd'
import * as React from 'react'




const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '描述',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '类型',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <span>
        <a href="javascript:;">编辑</a>
        <a href="javascript:;">移除</a>
      </span>
    )
  }
]

const data = [
  {
    key: '1',
    name: '当月分享事件分析',
    username: '1213121',
    role: '事件分析'
  }
]



const DraftList = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default DraftList
