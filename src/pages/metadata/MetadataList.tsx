import * as React from 'react';
import style from './MetadataList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetMetadataList, doAddMetadata } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Modal, Drawer, Icon, Dropdown, Menu } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, TableRowSelection, ColumnFilterItem } from 'antd/lib/table';
import { IMetadataListParam, IMetadataInfo, IMetadataAddParam } from '@/api';
import MetadataAddModal from './components/MetadataAddModal';
import TagManagement from './components/TagManagement';
import MetadataListForm from './components/MetadataListForm';
import { tagListFiltersSelector } from '@/store/selectors';
const { confirm } = Modal;

interface Props {
  getMetadataList: (params: IMetadataListParam) => IAction;
  addMetadata: (params: IMetadataAddParam) => IAction;
  metadataList: IPageData<IMetadataInfo>;
  metadataListParams: IMetadataListParam;
  tagListFilters: ColumnFilterItem[];
  projectId: number;
}

const MetadataList = ({
  metadataList,
  getMetadataList,
  metadataListParams,
  tagListFilters,
  addMetadata,
  projectId
}: Props) => {
  const [addMetadataVisible, setAddMetadataVisible] = React.useState(false);
  const [tagDrawerVisible, settagDrawerVisible] = React.useState(false);
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
      title: (
        <span>
          标签
          <Icon key='3' type='question-circle' onClick={() => settagDrawerVisible(true)} />
        </span>
      ),
      dataIndex: 'tag',
      filters: tagListFilters,
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
      key: 'description',
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <Button size='small'>编辑</Button>
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

    getMetadataList({ ...metadataListParams, ...params });
  }

  const rowSelection: TableRowSelection<IMetadataInfo> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows);
    }
  };

  const handleDeleteMetadata = () => {
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

  const handleMetadata = () => {};

  const batchMenu = (
    <Menu>
      <Menu.Item key='1'>删除</Menu.Item>
      <Menu.Item key='2'>添加标签</Menu.Item>
      <Menu.Item key='4'>启用</Menu.Item>
      <Menu.Item key='5'>禁用</Menu.Item>
    </Menu>
  );

  return (
    <div className={style.wrapper}>
      <MetadataAddModal
        onSubmit={addMetadata}
        projectId={projectId}
        visible={addMetadataVisible}
        onClose={setAddMetadataVisible}
      ></MetadataAddModal>
      <Drawer
        width={640}
        title='标签管理'
        placement='right'
        closable={false}
        onClose={() => settagDrawerVisible(false)}
        visible={tagDrawerVisible}
      >
        <TagManagement></TagManagement>
      </Drawer>
      <div className='app-card'>
        <div className='fl'>
          <MetadataListForm defaultValue={metadataListParams} onSubmit={getMetadataList}></MetadataListForm>
        </div>
        <div className='fr'>
          <Button onClick={() => setAddMetadataVisible(true)}>新增元数据</Button>
          &nbsp;
          <Button>导入</Button>
          &nbsp;
          {!!selectedRows.length && (
            <Dropdown overlay={batchMenu}>
              <Button>
                批量操作 <Icon type='down' />
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
      <div className='app-card'>
        <Table
          rowSelection={rowSelection}
          rowKey='id'
          columns={columns}
          dataSource={metadataList.list}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      getMetadataList: params => {
        return doGetMetadataList.request(params);
      },
      addMetadata: (params: IMetadataAddParam) => {
        return doAddMetadata.request(params);
      }
    },

    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { metadataList, metadataListParams, tagList } = state.metadata;
  const projectId = state.project.projectInfo.id;
  const tagListFilters = tagListFiltersSelector(state);
  return {
    metadataList,
    metadataListParams,
    tagList,
    tagListFilters,
    projectId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetadataList);
