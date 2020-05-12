import { Table, Button } from 'antd';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { IAction, IStoreState } from '@/types';
import { connect } from 'react-redux';
import { IProjectInfo } from '@/api';

interface Props {
  projectInfo: IProjectInfo;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'nickname',
    key: 'nickname'
  },
  {
    title: '账号',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName'
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => {
      return (
        <span>
          <Button size='small'>编辑</Button>
          &nbsp;
          <Button size='small'>移除</Button>
        </span>
      );
    }
  }
];

const ProjectMember = ({ projectInfo }: Props) => {
  return (
    <div>
      <Button>添加成员</Button>
      <Table columns={columns} dataSource={projectInfo.members.map((item) => ({ key: item.id, ...item }))} />
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { projectInfo } = state.project;
  return {
    projectInfo
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember);
