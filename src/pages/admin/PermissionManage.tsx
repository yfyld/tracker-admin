import React from 'react';
import { connect } from 'react-redux';
import { IAction, IPageData, IStoreState } from '@/types';
import { bindActionCreators, Dispatch } from 'redux';
import { IBasePermission, IPermissionListItem, IQueryPermission, IUpdatePermission } from '@/api';
import { doDeletePermission, doEditPermission, doGetPermission } from '@/store/actions';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { ROUTE_PATH, permissionTypeDescription, formItemLayout } from '@/constants';
import { Button, Table, Popconfirm, notification, Row, Col, Input, Form, Card } from 'antd';
import PermissionAddModal from '@/pages/admin/components/PermissionAddModal';
import style from '@/pages/admin/PermissionManage.module.less';
import PermissionEditModal from './components/PermissionEditModal';
import { toastformError, trimAll } from '@/utils';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {
  addPermissionItem: IBasePermission;
  updatePermissionItem: IUpdatePermission;
  permissionList: IPageData<IPermissionListItem>;
  permissionListParams: IQueryPermission;
  onGetPermissionList: (params: IQueryPermission) => IAction;
  onDeletePermission: (params: number) => IAction;
  onEditPermission: (params: IUpdatePermission) => IAction;
}

const PermissionManage = (props: Props) => {
  const { getFieldDecorator } = props.form;
  const [addPermissionVisible, setAddPermissionVisible] = React.useState(false);
  const [editPermissionVisible, setEditPermissionVisible] = React.useState(false);

  const columns: ColumnProps<IPermissionListItem>[] = [
    {
      key: 'name',
      title: '权限名',
      dataIndex: 'name'
    },
    {
      key: 'code',
      title: '权限码',
      dataIndex: 'code'
    },
    {
      key: 'type',
      title: '权限类型',
      render: (text, record) => <span>{permissionTypeDescription[record.type]}</span>
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description'
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
            onClick={() => {
              props.onEditPermission(record);
              setEditPermissionVisible(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm title='是否要删除此行？' onConfirm={() => props.onDeletePermission(record.id)}>
            <Button type='link' size='small'>
              删除
            </Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  const handleTableChange = (pagination: PaginationConfig) => {
    props.onGetPermissionList({
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
      props.onGetPermissionList(values);
    });
  };

  return (
    <div className={style.wrapper}>
      <Row gutter={24}>
        <Col>
          <Row>
            <Form layout='horizontal' {...formItemLayout}>
              <Col span={6}>
                <Form.Item label='权限名/码'>
                  {getFieldDecorator('name', {
                    initialValue: props.permissionListParams.name
                  })(<Input placeholder='请输入权限名/权限码' />)}
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
              <PermissionAddModal visible={addPermissionVisible} onClose={setAddPermissionVisible}></PermissionAddModal>
              <PermissionEditModal
                visible={editPermissionVisible}
                onClose={setEditPermissionVisible}
              ></PermissionEditModal>
              <div className={style.rightBtn}>
                <Button type='primary' onClick={() => setAddPermissionVisible(true)}>
                  新建权限
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
          dataSource={props.permissionList.list}
          pagination={{
            pageSize: props.permissionListParams.pageSize,
            total: props.permissionList.totalCount,
            current: props.permissionListParams.page
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { addPermissionItem, updatePermissionItem, permissionList, permissionListParams } = state.permission;
  return {
    addPermissionItem,
    updatePermissionItem,
    permissionList,
    permissionListParams
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetPermissionList: (params: IQueryPermission) => {
        return doGetPermission.request(params);
      },
      onDeletePermission: (params: number) => {
        return doDeletePermission.request(params);
      },
      onEditPermission: (params: IUpdatePermission) => {
        return doEditPermission(params);
      }
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Form.create<Props>()(PermissionManage));
