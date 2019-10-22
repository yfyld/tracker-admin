import * as React from 'react';
import style from './TagManagement.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction } from '@/types';

import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Modal } from 'antd';
import { ColumnProps } from 'antd/lib/table';

const { confirm } = Modal;

interface Props {}

const TagManagement = (props: Props) => {
  const columns: ColumnProps<any>[] = [
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name'
    },
    {
      key: 'desc',
      title: '描述',
      dataIndex: 'desc'
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <button onClick={() => handleDeleteMetadata(record)}>删除</button>
        </span>
      )
    }
  ];

  const handleDeleteMetadata = (record: any) => {
    confirm({
      title: '提示',
      content: '确定要删除选中的元数据',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      }
    });
  };

  return (
    <div className={style.wrapper}>
      <div>
        <Button>新增标签</Button>
      </div>
      <Table rowKey='id' columns={columns} dataSource={[]} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({}, dispatch);

const mapStateToProps = (state: IStoreState) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagManagement);
