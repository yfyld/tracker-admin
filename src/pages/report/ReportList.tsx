import * as React from 'react';
import style from './ReportList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetReportList, doAddReport, doDeleteReport, doAppendReportToBoard } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Icon, Tooltip, Modal, Popover, Select, message } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, ColumnFilterItem } from 'antd/lib/table';
import { IReportListParam, IReportInfo, IReportAddParam, IBoardInfo, IReportAppendToBoard } from '@/api';
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
  projectId: number;
  onAppendReportToBoard: (params: IReportAppendToBoard) => any;
}

const ReportList = ({
  reportList,
  doGetReportList,
  reportListParams,
  doAddReport,
  doDeleteReport,
  boardList,
  boardListFilters,
  onAppendReportToBoard,
  projectId
}: Props) => {
  const [addReportVisible, setAddReportVisible] = React.useState(false);
  const [appendedBoardIds, setappendedBoardIds] = React.useState<number[]>([]);
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
      key: 'boards',
      title: '所属看板',
      dataIndex: 'boards',
      filters: boardListFilters,
      filterMultiple: false,
      render: (text, record) => {
        if (!record.boards) {
          return '';
        }
        return record.boards.map(item => item.name).join(',');
      }
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
          <Tooltip title='添加到看板'>
            <Popover
              placement='bottom'
              onVisibleChange={value => value && setappendedBoardIds([])}
              content={
                <div>
                  <Select
                    size='small'
                    onChange={(e: number[]) => setappendedBoardIds(e)}
                    value={appendedBoardIds}
                    style={{ width: 240 }}
                    mode='multiple'
                  >
                    {boardList.list
                      .filter(item => !record.boards.find(val => val.id === item.id))
                      .map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                  &nbsp;
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
    newRecord.boards = null;
    newRecord.name = newRecord.name + '-copy';
    doAddReport(newRecord);
  }

  function handleReportAppendBoard(record: IReportInfo) {
    if (!appendedBoardIds.length) {
      message.info('请选择看板');
      return;
    }
    onAppendReportToBoard({ reportId: record.id, boardIds: appendedBoardIds, projectId });
    // if (!record.boards.length) {
    //   setcurReportInfo(record);
    //   setappendBoardVisible(true);
    // } else {
    //   onAppendReportToBoard({ reportId: record.id, boardIds: appendedBoardIds,projectId });
    // }
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

    if (filters.boardId) {
      params.boardId = filters.boardId[0];
    }

    doGetReportList({ ...reportListParams, ...params });
  }

  return (
    <div className={style.wrapper}>
      <ReportAddModal projectId={projectId} visible={addReportVisible} onClose={setAddReportVisible}></ReportAddModal>
      <BoardAppendReportModal
        defaultValue={curReportInfo}
        visible={appendBoardVisible}
        onClose={setappendBoardVisible}
        onSubmit={doAddReport}
      />
      <div className='app-card'>
        <div className='app-fl'>
          <ReportListForm onSubmit={doGetReportList} defaultValue={reportListParams}></ReportListForm>
        </div>
        <div className='app-fr'>
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
      },
      onAppendReportToBoard: (params: IReportAppendToBoard) => {
        return doAppendReportToBoard.request(params);
      }
    },
    dispatch
  );

const mapStateToProps = (state: IStoreState) => {
  const { reportList, reportListParams } = state.report;
  const { boardList } = state.board;
  const projectId = state.project.projectInfo.id;
  const boardListFilters = boardListFiltersSelector(state);
  const boardListMap = boardListMapSelector(state);
  return {
    reportList,
    reportListParams,
    boardList,
    boardListFilters,
    boardListMap,
    projectId
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
