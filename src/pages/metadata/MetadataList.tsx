import * as React from 'react';
import style from './MetadataList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetMetadataList } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, TableRowSelection } from 'antd/lib/table';
import { IMetadataListParam, IMetadataInfo } from '@/api';
import MetadataAddModal from './components/MetadataAddModal';

interface Props {
  doGetMetadataList: (params: IMetadataListParam) => IAction;
  metadataList: IPageData<IMetadataInfo>;
  metadataListParams: IMetadataListParam;
}

const MetadataList = ({ metadataList, doGetMetadataList, metadataListParams }: Props) => {
  const [addMetadataVisible, setAddMetadataVisible] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const columns: ColumnProps<IMetadataInfo>[] = [
    {
      key: 'code',
      title: 'Code',
      dataIndex: 'code',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name'
    },
    {
      key: 'tag',
      title: '标签',
      dataIndex: 'tag',
      filters: [
        {
          text: '前端埋点',
          value: 'aaa'
        }
      ],
      filterMultiple: true
    },
    {
      key: 'status',
      title: '启用',
      dataIndex: 'status',
      filters: [
        {
          text: '启用',
          value: '1'
        },
        {
          text: '停用',
          value: '0'
        }
      ],
      filterMultiple: false
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
          <button>编辑</button>
        </span>
      )
    }
  ];

  function handleChange(
    pagination: PaginationConfig,
    filters: Record<string | number | symbol, string[]>,
    sorter: SorterResult<any>
  ) {
    console.log('params', pagination, filters, sorter);
    const params: any = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortKey: null,
      sortType: null,
      tags: null,
      status: null
    };
    if (sorter.field) {
      params.sortKey = sorter.field;
      params.sortType = sorter.order;
    }
    if (filters.tag) {
      params.tags = filters.tag.join(',');
    }
    if (filters.status) {
      params.status = filters.status[0];
    }

    doGetMetadataList({ ...metadataListParams, ...params });
  }

  const rowSelection: TableRowSelection<IMetadataInfo> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows);
    }
  };

  return (
    <div className={style.wrapper}>
      <MetadataAddModal visible={addMetadataVisible} onClose={setAddMetadataVisible}></MetadataAddModal>
      <div>
        <Button onClick={() => setAddMetadataVisible(true)}>新增元数据</Button>

        {!!selectedRows.length && [<Button key='1'>批量删除</Button>, <Button key='2'>批量添加标签</Button>]}
      </div>
      <Table
        rowSelection={rowSelection}
        rowKey='id'
        columns={columns}
        dataSource={metadataList.list}
        onChange={handleChange}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doGetMetadataList: params => {
        return doGetMetadataList.request(params);
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { metadataList, metadataListParams } = state.metadata;
  return {
    metadataList,
    metadataListParams
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetadataList);
