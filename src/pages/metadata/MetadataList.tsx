import * as React from 'react';
import style from './MetadataList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetMetadataList, doDeleteMetadata, doEnableMetadata, doDisableMetadata } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Modal, Drawer, Tag } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, ColumnFilterItem } from 'antd/lib/table';
import { IMetadataListParam, IMetadataInfo, ITagInfo, IMetadataType } from '@/api';
import MetadataAddModal from './components/MetadataAddModal';
import MetadataEditModal from './components/MetadataEditModal';
import TagManagement from './components/TagManagement';
import MetadataListForm from './components/MetadataListForm';
import { tagListFiltersSelector } from '@/store/selectors';
const { confirm } = Modal;

interface Props {
  getMetadataList: (params: IMetadataListParam) => IAction;
  doDeleteMetadata: (params: number) => IAction;
  doEnableMetadata: (params: number) => IAction;
  doDisableMetadata: (params: number) => IAction;
  metadataList: IPageData<IMetadataInfo>;
  metadataListParams: IMetadataListParam;
  tagListFilters: ColumnFilterItem[];
  projectId: number;
}

const MetadataList = ({
  metadataList,
  getMetadataList,
  doDeleteMetadata,
  doEnableMetadata,
  doDisableMetadata,
  metadataListParams,
  tagListFilters
}: Props) => {
  const [addMetadataVisible, setAddMetadataVisible] = React.useState(false);
  const [editMetadataVisible, setEditMetadataVisible] = React.useState(false);
  const [curMetadataInfo, setCurMetadataInfo] = React.useState<IMetadataInfo>({
    id: null,
    code: '',
    name: '',
    type: null,
    description: '',
    projectId: null,
    status: null,
    tags: []
  });
  const [tagDrawerVisible, setTagDrawerVisible] = React.useState(false);

  const columns: ColumnProps<IMetadataInfo>[] = [
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name'
    },
    {
      key: 'code',
      title: 'Code',
      dataIndex: 'code',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: 'type',
      title: '类型',
      dataIndex: 'type',
      filters: [
        {
          text: '页面',
          value: '' + IMetadataType.page
        },
        {
          text: '事件',
          value: '' + IMetadataType.event
        }
      ],
      filterMultiple: false,
      render: (text: number) => <span>{filterMetadataType(text)}</span>
    },
    {
      key: 'status',
      title: '启用',
      dataIndex: 'status',
      filters: [
        {
          text: '是',
          value: '1'
        },
        {
          text: '否',
          value: '0'
        }
      ],
      filterMultiple: false,
      render: (text: number) => <span>{text === 1 ? '是' : '否'}</span>
    },
    {
      key: 'log',
      title: '产生日志',
      dataIndex: 'log',
      filters: [
        {
          text: '是',
          value: '1'
        },
        {
          text: '否',
          value: '0'
        }
      ],
      filterMultiple: false,
      render: (text: number) => <span>{text === 1 ? '是' : '否'}</span>
    },
    {
      key: 'tags',
      title: '标签',
      dataIndex: 'tags',
      filters: tagListFilters,
      filterMultiple: true,
      render: (tags: ITagInfo[], record: any) => {
        return (
          <div>
            {tags.map(item => (
              <Tag color='#1890ff' key={item.id}>
                {item.name}
              </Tag>
            ))}
          </div>
        );
      }
    },
    {
      key: 'description',
      title: '备注',
      dataIndex: 'description'
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (text: any, record: any) => (
        <span>
          <Button type='link' size='small' onClick={() => handleUpdateMetadata(record)}>
            编辑
          </Button>
          {record.status === 1 && (
            <Button type='link' size='small' onClick={() => handleDisableMetadata(record.id)}>
              禁用
            </Button>
          )}
          {record.status === 0 && (
            <Button type='link' size='small' onClick={() => handleEnableMetadata(record.id)}>
              启用
            </Button>
          )}
          <Button type='link' size='small' onClick={() => handleDeleteMetadata(record.id)}>
            删除
          </Button>
        </span>
      )
    }
  ];

  const filterMetadataType = (type: number) => {
    switch (type) {
      case IMetadataType.page:
        return '页面';
      case IMetadataType.event:
        return '事件';
      default:
        return '';
    }
  };

  function handleChange(
    pagination: PaginationConfig,
    filters: Record<string | number | symbol, string[]>,
    sorter: SorterResult<any>
  ) {
    const params: any = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortKey: null,
      sortType: null,
      tags: null,
      type: null,
      status: null
    };
    if (sorter.field) {
      params.sortKey = sorter.field;
      params.sortType = sorter.order;
    }
    if (filters.tags) {
      params.tags = filters.tags.join(',');
    }
    if (filters.status) {
      params.status = filters.status[0];
    }
    if (filters.type) {
      params.type = filters.type[0];
    }
    if (filters.log) {
      params.log = filters.log[0];
    }

    getMetadataList({ ...metadataListParams, ...params });
  }

  const handleDeleteMetadata = (metadataId: number) => {
    confirm({
      title: '提示',
      content: '确定要删除选中的元数据',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        doDeleteMetadata(metadataId);
      }
    });
  };

  const handleUpdateMetadata = (record: IMetadataInfo) => {
    setCurMetadataInfo(record);
    setEditMetadataVisible(true);
  };

  const handleDisableMetadata = (id: number) => {
    doDisableMetadata(id);
  };
  const handleEnableMetadata = (id: number) => {
    doEnableMetadata(id);
  };

  return (
    <div className={style.wrapper}>
      <MetadataAddModal visible={addMetadataVisible} onClose={setAddMetadataVisible}></MetadataAddModal>
      <MetadataEditModal
        defaultValue={curMetadataInfo}
        visible={editMetadataVisible}
        onClose={setEditMetadataVisible}
      ></MetadataEditModal>
      <Drawer
        width={640}
        title='标签管理'
        placement='right'
        closable={false}
        onClose={() => setTagDrawerVisible(false)}
        visible={tagDrawerVisible}
      >
        <TagManagement></TagManagement>
      </Drawer>
      <div className='app-card'>
        <div className='app-fl'>
          <MetadataListForm defaultValue={metadataListParams} onSubmit={getMetadataList}></MetadataListForm>
        </div>
        <div className='app-fr'>
          <Button onClick={() => setAddMetadataVisible(true)}>新增元数据</Button>
          &nbsp;
          <Button onClick={() => setTagDrawerVisible(true)}>标签管理</Button>
        </div>
      </div>
      <div className='app-card'>
        <Table rowKey='id' columns={columns} dataSource={metadataList.list} onChange={handleChange} />
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
      doDeleteMetadata: params => {
        return doDeleteMetadata.request(params);
      },
      doEnableMetadata: params => {
        return doEnableMetadata.request(params);
      },
      doDisableMetadata: params => {
        return doDisableMetadata.request(params);
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

export default connect(mapStateToProps, mapDispatchToProps)(MetadataList);
