import { Table } from 'antd'
import React from 'react'




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
        <button>编辑</button>
        <button>移除</button>
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
