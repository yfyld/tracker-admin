import * as React from 'react';
import style from './ReportList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetReportList, doAddReport, doDeleteReport } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Icon, Tooltip, Modal, Popover, Select } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps } from 'antd/lib/table';
import { IReportListParam, IReportInfo, IReportAddParam } from '@/api';
import ReportAddModal from './components/ReportAddModal';
import ReportListForm from './components/ReportListForm';
import BoardAppendReportModal from '@/components/BoardAppendReportModal';
const { confirm } = Modal;
interface Props {
  doGetReportList: (params: IReportListParam) => IAction;
  doAddReport: (params: IReportAddParam) => IAction;
  doDeleteReport: (param: number) => IAction;
  reportList: IPageData<IReportInfo>;
  reportListParams: IReportListParam;
}

const ReportList = ({ reportList, doGetReportList, reportListParams, doAddReport, doDeleteReport }: Props) => {
  const [addReportVisible, setAddReportVisible] = React.useState(false);
  const [appendBoardVisible, setappendBoardVisible] = React.useState(false);
  const [curReportInfo, setcurReportInfo] = React.useState<IReportInfo>({
    id: null,
    name: '',
    description: '',
    projectId: null,
    type: '',
    data: {}
  });

  const columns: ColumnProps<IReportInfo>[] = [
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name'
    },

    {
      key: 'type',
      title: '类型',
      dataIndex: 'type'
    },

    {
      key: 'description',
      title: '描述',
      dataIndex: 'description'
    },

    {
      key: 'status',
      title: '状态',
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
      key: 'board',
      title: '所属看板',
      dataIndex: 'board',
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
      title: '操作',
      key: 'action',
      render: (text: string, record) => (
        <span>
          <Tooltip title='编辑'>
            <Icon type='edit' />
          </Tooltip>
          &nbsp;
          <Tooltip title='拷贝'>
            <Icon onClick={() => handleReportCopy(record)} type='copy' />
          </Tooltip>
          &nbsp;
          <Tooltip title='添加副本到看板'>
            <Popover
              placement='bottom'
              content={
                <div>
                  <Select style={{ width: 120 }}>
                    <Select.Option value={1}>显示</Select.Option>
                    <Select.Option value={0}>不显示</Select.Option>
                  </Select>
                  <Button size='small' onClick={() => handleReportAppendBoard(record)}>
                    确定
                  </Button>
                </div>
              }
              title='选择看板'
              trigger='click'
            >
              <Icon type='plus-square' />
            </Popover>
          </Tooltip>
          &nbsp;
          <Tooltip title='删除'>
            <Icon onClick={() => handleReportDelete(record)} type='delete' />
          </Tooltip>
        </span>
      )
    }
  ];

  function handleReportCopy(record: IReportInfo) {
    const newRecord = { ...record };
    newRecord.id = null;
    newRecord.name = newRecord.name + '-copy';
    doAddReport(newRecord);
  }

  function handleReportAppendBoard(record: IReportInfo) {
    setcurReportInfo(record);
    setappendBoardVisible(true);
  }

  function handleReportDelete(record: IReportInfo) {
    confirm({
      title: '提示',
      content: `确定要删除"${record.name}"`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        doDeleteReport(record.id);
      }
    });
  }

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

    if (filters.status) {
      params.status = filters.status[0];
    }

    doGetReportList({ ...reportListParams, ...params });
  }

  return (
    <div className={style.wrapper}>
      <ReportAddModal visible={addReportVisible} onClose={setAddReportVisible}></ReportAddModal>
      <BoardAppendReportModal
        defaultValue={curReportInfo}
        visible={appendBoardVisible}
        onClose={setappendBoardVisible}
        onSubmit={doAddReport}
      />
      <div className='app-card'>
        <div className='fl'>
          <ReportListForm onSubmit={doGetReportList} defaultValue={reportListParams}></ReportListForm>
        </div>
        <div className='fr'>
          <Button onClick={() => setAddReportVisible(true)}>新增报表</Button>
        </div>
      </div>
      <div className='app-card'>
        <Table rowKey='id' columns={columns} dataSource={reportList.list} onChange={handleChange} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doGetReportList: params => {
        return doGetReportList.request(params);
      },
      doAddReport: (params: IReportAddParam) => {
        return doAddReport.request(params);
      },
      doDeleteReport: (params: number) => {
        return doDeleteReport.request(params);
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { reportList, reportListParams } = state.report;
  return {
    reportList,
    reportListParams
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportList);
