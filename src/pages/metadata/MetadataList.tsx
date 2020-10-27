import * as React from 'react';
import style from './MetadataList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData, IInfoParam } from '@/types';
import {
  doGetMetadataList,
  doDeleteMetadata,
  doEnableMetadata,
  doDisableMetadata,
  doAddMetadataByExcel,
  doUpdateMetadataLog,
  doBatchMetadata
} from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Modal, Drawer, Tag, Upload, Icon, Avatar, Alert, Dropdown, Menu, Select } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, ColumnFilterItem, TableRowSelection } from 'antd/lib/table';
import {
  IMetadataListParam,
  IMetadataInfo,
  ITagInfo,
  EMetadataType,
  fetchMetadataAddByExcel,
  IMetadataAddByExcelParam,
  EOperatorType,
  ITagList,
  IBatchMetadataParam
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
import { Link } from 'react-router-dom';
import { objToQueryString } from '@/utils';
const { confirm } = Modal;

interface Props {
  onGetMetadataList: (params: IMetadataListParam) => IAction;
  onDeleteMetadata: (params: number) => IAction;
  onEnableMetadata: (params: number) => IAction;
  onDisableMetadata: (params: number) => IAction;
  onAddMetadataByExcel: (params: IMetadataAddByExcelParam) => IAction;
  onUpdateMetadataLog: (params: IInfoParam) => IAction;
  onBatchMetadata: (params: IBatchMetadataParam) => IAction;
  metadataList: IPageData<IMetadataInfo>;
  metadataListParams: IMetadataListParam;
  tagListFilters: ColumnFilterItem[];
  projectId: number;
  uploading: boolean;
  tagList: ITagList;
}

const MetadataList = ({
  metadataList,
  onGetMetadataList,
  onDeleteMetadata,
  onEnableMetadata,
  onDisableMetadata,
  onUpdateMetadataLog,
  onBatchMetadata,
  metadataListParams,
  tagListFilters,
  onAddMetadataByExcel,
  projectId,
  uploading,
  tagList
}: Props) => {
  const [addMetadataVisible, setAddMetadataVisible] = React.useState(false);
  const [editMetadataVisible, setEditMetadataVisible] = React.useState(false);
  const [selectedRowKeys, setselectedRowKeys] = React.useState([] as number[]);
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
    logByApp: 0,
    operatorType: 0,
    recentLog: 0
  });
  const [tagDrawerVisible, setTagDrawerVisible] = React.useState(false);

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
    if (filters.operatorType) {
      params.operatorType = filters.operatorType[0];
    }
    if (filters.log) {
      params.log = filters.log[0];
    }

    onGetMetadataList({ ...metadataListParams, ...params });
  }

  const handleDeleteMetadata = (metadataId: number) => {
    confirm({
      title: '提示',
      content: '确定要删除当前元数据',
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

  const handleMenuClick = (key: string, record: any) => {
    switch (key) {
      case 'ENABLE':
        onEnableMetadata(record.id);
        break;

      case 'DISABLE':
        onDisableMetadata(record.id);
        break;
      case 'DEL':
        handleDeleteMetadata(record.id);
        break;

      case 'UPDATE_LOG':
        onUpdateMetadataLog({ id: record.id, projectId: record.projectId });
        break;

      default:
        break;
    }
  };

  const menu = (record: any) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      {record.status === 0 ? <Menu.Item key='ENABLE'>启用</Menu.Item> : <Menu.Item key='DISABLE'>禁用</Menu.Item>}
      <Menu.Item key='UPDATE_LOG'>更新日志</Menu.Item>
      <Menu.Item key='DEL'>删除</Menu.Item>
    </Menu>
  );

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
      width: 100,
      dataIndex: 'name'
    },
    {
      key: 'code',
      title: 'Code',
      width: 120,
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
    // {
    //   key: 'operatorType',
    //   title: '执行者',
    //   dataIndex: 'operatorType',
    //   filters: [
    //     {
    //       text: 'native',
    //       value: '' + EOperatorType.native
    //     },
    //     {
    //       text: 'h5',
    //       value: '' + EOperatorType.h5
    //     },
    //     {
    //       text: 'all',
    //       value: '' + EOperatorType.all
    //     },
    //     {
    //       text: '待定',
    //       value: '' + EOperatorType['待定']
    //     }
    //   ],
    //   filterMultiple: false,
    //   render: (text: number) => <span>{EOperatorType[text]}</span>
    // },
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
          text: '无日志',
          value: 'NONE'
        },
        {
          text: '无H5日志',
          value: 'NONE_H5'
        },
        {
          text: '无Native日志',
          value: 'NONE_NATIVE'
        },
        {
          text: '有H5日志',
          value: 'H5'
        },
        {
          text: '有Native日志',
          value: 'NATIVE'
        },
        {
          text: '有日志',
          value: 'ALL'
        }
      ],
      filterMultiple: false,
      render: (text: number, record) =>
        record.log ? (
          <div>
            <span>
              总日志:{record.log}(最新:{record.recentLog})条
            </span>

            <br />
            <span>app日志:{record.logByApp}条</span>
            <br />
            <span>H5日志:{record.log - record.logByApp}条</span>
          </div>
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
      width: 100,
      dataIndex: 'url'
    },
    {
      key: 'description',
      title: '备注',
      width: 150,
      dataIndex: 'description'
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (text: any, record: any) => (
        <span>
          <Button type='link' size='small' onClick={() => handleUpdateMetadata(record)}>
            编辑
          </Button>
          &nbsp;
          <Dropdown overlay={menu(record)}>
            <span>
              更多
              <Icon type='down' />
            </span>
          </Dropdown>
        </span>
      )
    }
  ];

  const rowSelection: TableRowSelection<IMetadataInfo> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setselectedRowKeys(selectedRowKeys as number[]);
    }
  };

  const handleBatch = (type: string) => {
    switch (type) {
      case 'TAG':
        {
          let values: string[] = [];
          confirm({
            title: '提示',
            content: (
              <Select
                mode='tags'
                placeholder='选择事件标签'
                defaultValue={values}
                onChange={(e: string[]) => {
                  values = e;
                }}
                style={{ width: '100%' }}
              >
                {tagList.list.map((item) => (
                  <Select.Option key={item.id} value={'' + item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            ),
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
              console.log(values, selectedRowKeys);
              onBatchMetadata({
                type,
                ids: selectedRowKeys,
                projectId,
                tags: values
              });
            }
          });
        }

        break;
      case 'DEL':
        {
          confirm({
            title: '提示',
            content: '确定要删除选中的元数据',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              onBatchMetadata({
                type,
                ids: selectedRowKeys,
                projectId
              });
            }
          });
        }

        break;
      default:
        {
          onBatchMetadata({
            type,
            ids: selectedRowKeys,
            projectId,
            status: type === 'DISABLE' ? 0 : 1
          });
        }
        break;
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

      <div className='app-tablePage-wrapper'>
        <Alert
          message='请使用命名空间+语义化的方式命名code 如:  业务-类型-详情  zyjk-click-member-pay(智云健康会员支付点击事件)  '
          type='warning'
          closable
        />
        <div className='app-tablePage-title'>元数据列表</div>
        <div className='app-tablePage-form'>
          <div>
            <Upload
              showUploadList={false}
              style={{ display: 'inline-block' }}
              action={config.baseURL + '/common/upload'}
              onChange={handleImportChange}
            >
              <Button size='large' loading={uploading}>
                <Icon type='upload' /> 导入元数据
              </Button>
            </Upload>
            &nbsp;
            <a href='/static/元数据模板.xlsx' download='埋点元数据导入模板.xlsx'>
              <Button size='large'>导入模板下载</Button>
            </a>
            &nbsp;
            <Button size='large' onClick={() => setAddMetadataVisible(true)}>
              新增元数据
            </Button>
            &nbsp;
            <Button size='large' onClick={() => setTagDrawerVisible(true)}>
              标签管理
            </Button>
            &nbsp;
            <a href={`${config.baseURL}/metadata/export?${objToQueryString(metadataListParams)}`}>
              <Button size='large'>导出元数据</Button>
            </a>
          </div>
          <div>
            <MetadataListForm defaultValue={metadataListParams} onSubmit={onGetMetadataList}></MetadataListForm>
          </div>
        </div>

        <div className='app-tablePage-table'>
          <div className='app-tablePage-tableBtnBox'>
            <Button onClick={() => handleBatch('TAG')} type='link'>
              添加标签
            </Button>
            <Button onClick={() => handleBatch('DEL')} type='link'>
              删除
            </Button>
            <Button onClick={() => handleBatch('ENABLE')} type='link'>
              启用
            </Button>
            <Button onClick={() => handleBatch('DISABLE')} type='link'>
              禁用
            </Button>
          </div>

          <Table
            rowSelection={rowSelection}
            rowKey='id'
            columns={columns}
            dataSource={metadataList.list}
            onChange={handleChange}
            pagination={{ pageSize: 20, total: metadataList.totalCount }}
          />
        </div>
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
      onUpdateMetadataLog: (params) => {
        return doUpdateMetadataLog.request(params);
      },
      onAddMetadataByExcel: (params) => {
        return doAddMetadataByExcel.request(params);
      },
      onBatchMetadata: (params) => {
        return doBatchMetadata.request(params);
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { metadataList, metadataListParams, tagList, uploading } = state.metadata;
  const projectId = state.project.projectInfo.id;
  const tagListFilters = tagListFiltersSelector(state);
  return {
    metadataList,
    metadataListParams,
    tagList,
    tagListFilters,
    projectId,
    uploading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetadataList);
