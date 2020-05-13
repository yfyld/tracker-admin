import { Table, Button, Modal, Select } from 'antd';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { IAction, IStoreState } from '@/types';
import { connect } from 'react-redux';
import { IProjectInfo, IProjectMemberDelParam, IProjectMemberUpdateParam, IRoleList } from '@/api';
import ProjectMemberAddModal from './ProjectMemberAddModal';
import { doDeleteProjectMember, doUpdateProjectMember } from '@/store/actions';
const { Option } = Select;

interface Props {
  projectInfo: IProjectInfo;
  onDeleteProjectMember: (param: IProjectMemberDelParam) => IAction;
  onUpdateProjectMember: (param: IProjectMemberUpdateParam) => IAction;
  allRoleList: IRoleList;
}
const ProjectMember = ({ projectInfo, onDeleteProjectMember, onUpdateProjectMember, allRoleList }: Props) => {
  const [addMemberModalVisible, setaddMemberModalVisible] = React.useState(false);

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
            <Button size='small' onClick={() => handleUpdateMember(record.id)}>
              编辑
            </Button>
            &nbsp;
            <Button onClick={() => handleRemoveMember(record.id)} size='small'>
              移除
            </Button>
          </span>
        );
      }
    }
  ];

  function handleRemoveMember(id: number) {
    Modal.warning({
      title: '提示',
      content: '确定移除该成员吗',
      okText: '移除',
      onOk: () => {
        onDeleteProjectMember({
          projectId: projectInfo.id,
          userIds: [id]
        });
      }
    });
  }

  function handleUpdateMember(id: number) {
    let roleCode = '';
    Modal.confirm({
      title: '编辑成员',
      content: (
        <Select
          style={{ width: '100%' }}
          placeholder='选择角色'
          value={roleCode}
          onChange={(val: string) => {
            roleCode = val;
          }}
        >
          {allRoleList.list
            .filter((item) => item.type === 1)
            .map((item) => (
              <Option key={item.id} value={'' + item.code}>
                {item.name}
              </Option>
            ))}
        </Select>
      ),
      onOk: () => {
        onUpdateProjectMember({
          projectId: projectInfo.id,
          userIds: [id],
          roleCode
        });
      }
    });
  }

  return (
    <div>
      <ProjectMemberAddModal visible={addMemberModalVisible} onClose={setaddMemberModalVisible}></ProjectMemberAddModal>
      <Button onClick={() => setaddMemberModalVisible(true)}>添加成员</Button>
      <br />
      <br />
      <Table
        style={{ background: '#fff' }}
        columns={columns}
        dataSource={projectInfo.members.map((item) => ({ key: item.id, ...item }))}
      />
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { projectInfo } = state.project;
  const { allRoleList } = state.role;
  return {
    projectInfo,
    allRoleList
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onDeleteProjectMember: (param: IProjectMemberDelParam) => doDeleteProjectMember.request(param),
      onUpdateProjectMember: (param: IProjectMemberUpdateParam) => doUpdateProjectMember.request(param)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMember);
