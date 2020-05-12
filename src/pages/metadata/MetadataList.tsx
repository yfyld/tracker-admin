import * as React from 'react';
import style from './MetadataList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import {
  doGetMetadataList,
  doDeleteMetadata,
  doEnableMetadata,
  doDisableMetadata,
  doAddMetadataByExcel
} from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Modal, Drawer, Tag, Upload, Icon, Avatar, Alert } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, ColumnFilterItem } from 'antd/lib/table';
import {
  IMetadataListParam,
  IMetadataInfo,
  ITagInfo,
  EMetadataType,
  fetchMetadataAddByExcel,
  IMetadataAddByExcelParam
} from '@/api';
import MetadataAddModal from './components/MetadataAddModal';
import MetadataEditModal from './components/MetadataEditModal';
import TagManagement from './components/TagManagement';
import MetadataListForm from './components/MetadataListForm';
import { tagListFiltersSelector } from '@/store/selectors';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import config from '@/config';
import dayjs from 'dayjs';
const { confirm } = Modal;

interface Props {
  onGetMetadataList: (params: IMetadataListParam) => IAction;
  onDeleteMetadata: (params: number) => IAction;
  onEnableMetadata: (params: number) => IAction;
  onDisableMetadata: (params: number) => IAction;
  onAddMetadataByExcel: (params: IMetadataAddByExcelParam) => IAction;
  metadataList: IPageData<IMetadataInfo>;
  metadataListParams: IMetadataListParam;
  tagListFilters: ColumnFilterItem[];
  projectId: number;
}

const MetadataList = ({
  metadataList,
  onGetMetadataList,
  onDeleteMetadata,
  onEnableMetadata,
  onDisableMetadata,
  metadataListParams,
  tagListFilters,
  onAddMetadataByExcel,
  projectId
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
    tags: [],
    log: 0,
    recentLog: 0
  });
  const [tagDrawerVisible, setTagDrawerVisible] = React.useState(false);

  const columns: ColumnProps<IMetadataInfo>[] = [
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      width: 120,
      sortDirections: ['descend', 'ascend'],
      render: (text: string) => dayjs(text).format('YYYY-MM-DD')
    },
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
          value: '' + EMetadataType.page
        },
        {
          text: '事件',
          value: '' + EMetadataType.event
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
          text: '有',
          value: '1'
        },
        {
          text: '无',
          value: '0'
        }
      ],
      filterMultiple: false,
      render: (text: number, record) =>
        record.log ? (
          <span>
            {record.log}条(最新:{record.recentLog}条)
          </span>
        ) : (
          <span>无</span>
        )
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
            {tags.map((item) => (
              <Tag color='#1890ff' key={item.id}>
                {item.name}
              </Tag>
            ))}
          </div>
        );
      }
    },
    {
      key: 'url',
      title: 'URL',
      dataIndex: 'url'
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
            <Button type='link' size='small' onClick={() => onDisableMetadata(record.id)}>
              禁用
            </Button>
          )}
          {record.status === 0 && (
            <Button type='link' size='small' onClick={() => onEnableMetadata(record.id)}>
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
      case EMetadataType.page:
        return '页面';
      case EMetadataType.event:
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

    onGetMetadataList({ ...metadataListParams, ...params });
  }

  const handleDeleteMetadata = (metadataId: number) => {
    confirm({
      title: '提示',
      content: '确定要删除选中的元数据',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        onDeleteMetadata(metadataId);
      }
    });
  };

  const handleUpdateMetadata = (record: IMetadataInfo) => {
    setCurMetadataInfo(record);
    setEditMetadataVisible(true);
  };

  const handleImportChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'done') {
      onAddMetadataByExcel({ path: info.file.response.result.path, projectId });
    }
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
          <MetadataListForm defaultValue={metadataListParams} onSubmit={onGetMetadataList}></MetadataListForm>
        </div>
        <div className='app-fr'>
          <Upload
            showUploadList={false}
            style={{ display: 'inline-block' }}
            action={config.baseURL + '/common/upload'}
            onChange={handleImportChange}
          >
            <Button>
              <Icon type='upload' /> 导入元数据
            </Button>
          </Upload>
          &nbsp;
          <a href='/元数据模板.xlsx' download='导入模板'>
            <Button>导入模板下载</Button>
          </a>
          &nbsp;
          <Button onClick={() => setAddMetadataVisible(true)}>新增元数据</Button>
          &nbsp;
          <Button onClick={() => setTagDrawerVisible(true)}>标签管理</Button>
        </div>
      </div>
      <div className='app-card'>
        <Alert
          message='请使用命名空间+语义化的方式命名code 如: h5-page-member-detail(h5会员详情页)  zyjk-click-member-pay(智云健康会员支付点击事件)'
          type='warning'
          closable
        />
        <br />
        <Table
          rowKey='id'
          columns={columns}
          dataSource={metadataList.list}
          onChange={handleChange}
          pagination={{ pageSize: 20, total: metadataList.totalCount }}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetMetadataList: (params) => {
        return doGetMetadataList.request(params);
      },
      onDeleteMetadata: (params) => {
        return doDeleteMetadata.request(params);
      },
      onEnableMetadata: (params) => {
        return doEnableMetadata.request(params);
      },
      onDisableMetadata: (params) => {
        return doDisableMetadata.request(params);
      },
      onAddMetadataByExcel: (params) => {
        return doAddMetadataByExcel.request(params);
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
