import React from 'react';
import { connect } from 'react-redux';
import { IAction, IPageData, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { IBaseRole, IRoleListItem, IQueryRole, IUpdateRole } from '@/api';
import { doDeleteRole, doEditRole, doGetRole, doGetRoleInfo } from '@/store/actions';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { ROUTE_PATH, roleTypeDescription, formItemLayout } from '@/constants';
import { Button, Table, Popconfirm, notification, Row, Col, Input, Form, Card } from 'antd';
import RoleAddModal from '@/pages/admin/components/RoleAddModal';
import style from '@/pages/admin/RoleMange.module.less';
import RoleEditModal from './components/RoleEditModal';
import { toastformError, trimAll } from '@/utils';
import { FormComponentProps } from 'antd/lib/form';
import RoleLinkPermissionsModal from '@/pages/admin/components/RoleLinkPermissionsModal';

interface Props extends FormComponentProps {
  addRoleItem: IBaseRole;
  updateRoleItem: IUpdateRole;
  roleList: IPageData<IRoleListItem>;
  roleListParams: IQueryRole;
  onGetRoleList: (params: IQueryRole) => IAction;
  onDeleteRole: (params: number) => IAction;
  onEditRole: (params: IUpdateRole) => IAction;
  onGetRolePermissions: (roleId: number) => IAction;
}

const RoleManage = (props: Props) => {
  const { getFieldDecorator } = props.form;
  const [addRoleVisible, setAddRoleVisible] = React.useState(false);
  const [editRoleVisible, setEditRoleVisible] = React.useState(false);
  const [choosePermissionsVisible, setChoosePermissionsVisible] = React.useState(false);
  const [choosePermissionsRoleId, setChoosePermissionsRoleId] = React.useState(null);

  const columns: ColumnProps<IRoleListItem>[] = [
    {
      key: 'name',
      title: '角色名',
      dataIndex: 'name'
    },
    {
      key: 'code',
      title: '角色码',
      dataIndex: 'code'
    },
    {
      key: 'type',
      title: '角色类型',
      render: (text, record) => <span>{roleTypeDescription.find((item) => item.id === record.type).name}</span>
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description'
    },
    {
      key: 'updaterNickname',
      title: '最后更新人',
      dataIndex: 'updaterNickname'
    },
    {
      key: 'action',
      title: '操作',
      width: 280,
      render: (text, record) => (
        <span>
          <Button
            type='link'
            size='small'
            onClick={async () => {
              await props.onGetRolePermissions(record.id);
              setChoosePermissionsRoleId(record.id);
              setChoosePermissionsVisible(true);
            }}
          >
            关联权限
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              props.onEditRole(record);
              setEditRoleVisible(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm title='是否要删除此行？' onConfirm={() => props.onDeleteRole(record.id)}>
            <Button type='link' size='small'>
              删除
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  const handleTableChange = (pagination: PaginationConfig) => {
    props.onGetRoleList({
      ...props.form.getFieldsValue(),
      page: pagination.current,
      pageSize: pagination.pageSize
    });
  };

  const handleFilter = (e: React.MouseEvent) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        toastformError(err);
        return;
      }
      values.name = trimAll(values.name);
      props.onGetRoleList(values);
    });
  };

  return (
    <div className={style.wrapper}>
      <Row gutter={24}>
        <Col>
          <Row>
            <Form layout='horizontal' {...formItemLayout}>
              <Col span={6}>
                <Form.Item label='角色名/码'>
                  {getFieldDecorator('name', {
                    initialValue: props.roleListParams.name
                  })(<Input placeholder='请输入角色名/角色码' />)}
                </Form.Item>
              </Col>
            </Form>
            <Col span={4}>
              <span className={style.submitButtons}>
                <Button type='primary' onClick={handleFilter}>
                  查询
                </Button>
              </span>
            </Col>
            <Col span={14}>
              <RoleAddModal visible={addRoleVisible} onClose={setAddRoleVisible}></RoleAddModal>
              <RoleEditModal visible={editRoleVisible} onClose={setEditRoleVisible}></RoleEditModal>
              <RoleLinkPermissionsModal
                roleId={choosePermissionsRoleId}
                visible={choosePermissionsVisible}
                onClose={setChoosePermissionsVisible}
              ></RoleLinkPermissionsModal>
              <div className={style.rightBtn}>
                <Button type='primary' onClick={() => setAddRoleVisible(true)}>
                  新建角色
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className={style.table}>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={props.roleList.list}
          pagination={{
            pageSize: props.roleListParams.pageSize,
            total: props.roleList.totalCount,
            current: props.roleListParams.page
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { addRoleItem, updateRoleItem, roleList, roleListParams } = state.role;
  return {
    addRoleItem,
    updateRoleItem,
    roleList,
    roleListParams
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetRoleList: (params: IQueryRole) => {
        return doGetRole.request(params);
      },
      onDeleteRole: (params: number) => {
        return doDeleteRole.request(params);
      },
      onEditRole: (params: IUpdateRole) => {
        return doEditRole(params);
      },
      onGetRolePermissions: (roleId: number) => {
        return doGetRoleInfo.request(roleId);
      }
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(RoleManage));
