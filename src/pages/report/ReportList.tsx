import * as React from 'react';
import style from './ReportList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetReportList, doAddReport, doDeleteReport } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Icon, Tooltip, Modal, Popover, Select, message } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, ColumnFilterItem } from 'antd/lib/table';
import { IReportListParam, IReportInfo, IReportAddParam, IBoardInfo } from '@/api';
import ReportAddModal from './components/ReportAddModal';
import ReportListForm from './components/ReportListForm';
import BoardAppendReportModal from '@/components/BoardAppendReportModal';
import { boardListFiltersSelector, boardListMapSelector } from '@/store/selectors';
const { confirm } = Modal;
interface Props {
  doGetReportList: (params: IReportListParam) => IAction;
  doAddReport: (params: IReportAddParam) => IAction;
  doDeleteReport: (param: number) => IAction;
  reportList: IPageData<IReportInfo>;
  boardList: IPageData<IBoardInfo>;
  reportListParams: IReportListParam;
  boardListFilters: ColumnFilterItem[];
  boardListMap: { [prop: string]: IBoardInfo };
}

const ReportList = ({
  reportList,
  doGetReportList,
  reportListParams,
  doAddReport,
  doDeleteReport,
  boardList,
  boardListFilters,
  boardListMap
}: Props) => {
  const [addReportVisible, setAddReportVisible] = React.useState(false);
  const [appendedBoardId, setappendedBoardId] = React.useState(null);
  const [appendBoardVisible, setappendBoardVisible] = React.useState(false);
  const [curReportInfo, setcurReportInfo] = React.useState<IReportInfo>({
    id: null,
    name: '',
    description: '',
    projectId: null,
    type: '',
    data: {},
    dateStart: null,
    dateEnd: null,
    dateType: null
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
                  <Select
                    onChange={(e: number) => setappendedBoardId(e)}
                    value={appendedBoardId}
                    style={{ width: 120 }}
                  >
                    {boardList.list.map(item => (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    ))}
                  </Select>
                  <Button size='small' onClick={() => handleReportAppendBoard(record)}>
                    确定
                  </Button>
                </div>
              }
              title='选择看板'
              trigger='hover'
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

  if (reportListParams.inBoard) {
    columns.splice(-1, 0, {
      key: 'boardId',
      title: '所属看板',
      dataIndex: 'boardId',
      filters: boardListFilters,
      filterMultiple: false,
      render: text => {
        if (!text) {
          return '';
        } else if (boardListMap[text]) {
          return boardListMap[text].name;
        }
        return '所属看板已被删除';
      }
    });
  }

  function handleReportCopy(record: IReportInfo) {
    const newRecord = { ...record };
    newRecord.id = null;
    newRecord.boardId = null;
    newRecord.name = newRecord.name + '-copy';
    doAddReport(newRecord);
  }

  function handleReportAppendBoard(record: IReportInfo) {
    if (!appendedBoardId) {
      message.info('请选择看板');
      return;
    }
    setcurReportInfo({ ...record, boardId: appendedBoardId, id: null });
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
  const { boardList } = state.board;
  const boardListFilters = boardListFiltersSelector(state);
  const boardListMap = boardListMapSelector(state);
  return {
    reportList,
    reportListParams,
    boardList,
    boardListFilters,
    boardListMap
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportList);
