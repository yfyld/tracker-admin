import { Tabs, Table, Form, Button, Input } from 'antd'
import * as React from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
const TabPane = Tabs.TabPane

interface Props {
  form: WrappedFormUtils
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <span>
        <button >编辑</button>
        <button >移除</button>
      </span>
    )
  }
]

const data = [
  {
    key: '1',
    name: '小王',
    username: '1213121',
    role: 'ADMIN'
  }
]

const handleSubmit = () => {}

const Project = ({ form }: Props) => {
  const { getFieldDecorator } = form
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="基本信息" key="1">
          <Form style={{maxWidth:500}} {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item label="项目名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '项目名称不能为空'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="成员" key="2">
          <Table columns={columns} dataSource={data} />
        </TabPane>
        {/* <TabPane tab="设置" key="3">
          Content of Tab Pane 3
        </TabPane> */}
      </Tabs>
    </div>
  )
}

export default Form.create()(Project)
