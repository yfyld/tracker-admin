import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { Button, Pagination, Table, Modal, Input, message, Col, Row, Form, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IUserInfo, IUserList, IUserInfoParam, IUserListParam, IBaseUser } from '@/api';
import { IStoreState, IPageData, IAction } from '@/types';
import { doGetUserList, doGetUserRoles, doPutUser, doDeleteUser, doEditUser } from '@/store/actions';
import { formItemLayout, ROUTE_PATH } from '@/constants';

import UserAddModal from '@/pages/admin/components/UserAddModal';
import style from './UserManage.module.less';
import RoleEditModal from '@/pages/admin/components/RoleEditModal';
import RoleLinkPermissionsModal from '@/pages/admin/components/RoleLinkPermissionsModal';
import { FormComponentProps } from 'antd/lib/form';
import { toastformError, trimAll } from '@/utils';
import UserLinkRolesModal from '@/pages/admin/components/UserLinkRolesModal';
import UserEditModal from '@/pages/admin/components/UserEditModal';

const { confirm } = Modal;

interface Props extends FormComponentProps {
  userList: IPageData<IBaseUser>;
  userListParams: IUserListParam;
  userInfo: IUserInfo;
  onGetUserList: (param: IUserListParam) => IAction;
  onEditUser: (params: IBaseUser) => IAction;
  onGetUserRoles: (userId: number) => IAction;
  onDeleteUser: (userId: number) => IAction;
}

const UserManage = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const [addUserModalVisible, setAddProjectVisible] = React.useState(false);
  const [chooseRolesVisible, setChooseRolesVisible] = React.useState(false);
  const [chooseUpdateUser, setchooseUpdateUser] = React.useState<IBaseUser>(null);
  const [editUserVisible, setEditUserVisible] = React.useState(false);

  const handleFilter = () => {
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      values.username = trimAll(values.username);
      props.onGetUserList(values);
    });
  };

  const columns: ColumnProps<IBaseUser>[] = [
    {
      key: 'username',
      title: '用户名',
      dataIndex: 'username'
    },
    {
      key: 'nickname',
      title: '昵称',
      dataIndex: 'nickname'
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: 'mobile',
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      key: 'role',
      title: '角色',
      dataIndex: 'roles',
      render: (text, record) => <div>{record.roles.map((item) => item.name).join(',')}</div>
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span>
          <Button
            type='link'
            size='small'
            onClick={() => {
              setchooseUpdateUser(record);
              setEditUserVisible(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm title='是否要删除此行？' onConfirm={() => props.onDeleteUser(record.id)}>
            <Button type='link' size='small'>
              删除
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div className='app-tablePage-wrapper'>
      <UserAddModal visible={addUserModalVisible} onClose={setAddProjectVisible}></UserAddModal>
      {chooseUpdateUser && (
        <UserEditModal
          visible={editUserVisible}
          userInfo={chooseUpdateUser}
          onClose={setEditUserVisible}
        ></UserEditModal>
      )}
      <div className='app-tablePage-title'>用户管理</div>
      <div className='app-tablePage-form'>
        <div>
          <Button size='large' onClick={() => setAddProjectVisible(true)}>
            新建用户
          </Button>
        </div>
        <div>
          <Form
            layout='inline'
            onSubmit={() => {
              handleFilter();
            }}
          >
            <Form.Item label=''>
              {getFieldDecorator('username', {
                initialValue: props.userInfo.username
              })(<Input.Search size='large' placeholder='请输入角色名/角色码' />)}
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className='app-tablePage-table'>
        <Table rowKey='id' columns={columns} dataSource={props.userList.list} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { userInfo, userList } = state.app;
  return {
    userInfo,
    userList
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetUserList: (params: IUserListParam) => {
        return doGetUserList.request(params);
      },
      onEditUser: (params: IBaseUser) => {
        return doEditUser(params);
      },
      onGetUserRoles: (userId: number) => {
        return doGetUserRoles.request(userId);
      },
      onDeleteUser: (userId: number) => {
        return doDeleteUser.request(userId);
      }
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(UserManage));
