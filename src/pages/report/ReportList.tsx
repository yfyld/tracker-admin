import * as React from 'react';
import style from './ReportList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetReportList, doAddReport, doDeleteReport, doAppendReportToBoard } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Icon, Tooltip, Modal, Popover, Select, message, Dropdown, Menu } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps, ColumnFilterItem } from 'antd/lib/table';
import { IReportListParam, IReportInfo, IReportAddParam, IBoardInfo, IReportAppendToBoard, IBoardList } from '@/api';
import ReportAddModal from './components/ReportAddModal';
import ReportListForm from './components/ReportListForm';
import BoardAppendReportModal from '@/components/BoardAppendReportModal';
import { boardListFiltersSelector, boardListMapSelector } from '@/store/selectors';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants';
import { getAnalysePath } from '@/utils';
import { ClickParam } from 'antd/lib/menu';
const { confirm } = Modal;
interface Props {
  onGetReportList: (params: IReportListParam) => IAction;
  onAddReport: (params: IReportAddParam) => IAction;
  onDeleteReport: (param: number) => IAction;
  reportList: IPageData<IReportInfo>;
  boardList: IBoardList;
  reportListParams: IReportListParam;
  boardListFilters: ColumnFilterItem[];
  boardListMap: { [prop: string]: IBoardInfo };
  projectId: number;
  onAppendReportToBoard: (params: IReportAppendToBoard) => any;
}

const ReportList = ({
  reportList,
  onGetReportList,
  reportListParams,
  onAddReport,
  onDeleteReport,
  boardList,
  boardListFilters,
  onAppendReportToBoard,
  projectId
}: Props) => {
  const [addReportVisible, setAddReportVisible] = React.useState(false);

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

  const handleMenuClick = (key: string, record: IReportInfo) => {
    switch (key) {
      case 'COPY':
        handleReportCopy(record);
        break;

      case 'APPEND':
        handleReportAppendBoard(record);
        break;
      case 'DEL':
        handleReportDelete(record);
        break;

      default:
        break;
    }
  };

  const menu = (record: IReportInfo) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key='COPY'>拷贝</Menu.Item>
      <Menu.Item key='APPEND'>添加到看板</Menu.Item>
      <Menu.Item key='DEL'>删除</Menu.Item>
    </Menu>
  );

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
        return record.boards.map((item) => item.name).join(',');
      }
    },

    {
      title: '操作',
      key: 'action',
      render: (text: string, record) => (
        <span>
          <Link to={getAnalysePath(record.type, record.projectId, record.id)}>
            <Button type='link'>编辑</Button>
          </Link>
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

  function handleReportCopy(record: IReportInfo) {
    const newRecord = { ...record };
    newRecord.id = null;
    newRecord.boards = null;
    newRecord.name = newRecord.name + '-copy';
    newRecord.dateStart = Number(newRecord.dateStart);
    newRecord.dateEnd = Number(newRecord.dateEnd);
    newRecord.data = JSON.parse(newRecord.data);
    onAddReport(newRecord);
  }

  function handleReportAppendBoard(record: IReportInfo) {
    let appendedBoardIds = record.boards.map((item) => item.id);
    Modal.info({
      title: '添加到看板',
      okText: '确定',
      content: (
        <Select
          size='small'
          onChange={(e: number[]) => (appendedBoardIds = e)}
          defaultValue={appendedBoardIds}
          style={{ width: 240 }}
          mode='multiple'
        >
          {boardList.list.map((item) => {
            const isExist = !!record.boards.find((val) => val.id === item.id);
            return (
              <Select.Option key={item.id} value={item.id} disabled={isExist}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      ),
      onOk() {
        if (!appendedBoardIds.length) {
          message.info('请选择看板');
          return;
        }
        onAppendReportToBoard({ reportId: record.id, boardIds: appendedBoardIds, projectId });
      }
    });
  }

  function handleReportDelete(record: IReportInfo) {
    confirm({
      title: '提示',
      content: `确定要删除"${record.name}"`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        onDeleteReport(record.id);
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

    onGetReportList({ ...reportListParams, ...params });
  }

  return (
    <div className={style.wrapper}>
      <ReportAddModal projectId={projectId} visible={addReportVisible} onClose={setAddReportVisible}></ReportAddModal>
      <BoardAppendReportModal
        reportInfo={curReportInfo}
        visible={appendBoardVisible}
        onClose={setappendBoardVisible}
        boardIds={[1]}
        onSubmit={onAppendReportToBoard}
      />

      <div className='app-tablePage-wrapper'>
        <div className='app-tablePage-title'>报表列表</div>
        <div className='app-tablePage-form'>
          <div>
            <Button size='large' onClick={() => setAddReportVisible(true)}>
              新增报表
            </Button>
          </div>
          <div>
            <ReportListForm onSubmit={onGetReportList} defaultValue={reportListParams}></ReportListForm>
          </div>
        </div>

        <div className='app-tablePage-table'>
          {/* <div className='app-tablePage-tableBtnBox'>
            <Button type='link'>添加标签</Button>
            <Button type='link'>删除</Button>
            <Button type='link'>启用</Button>
            <Button type='link'>禁用</Button>
          </div> */}
          <Table
            size='middle'
            bordered
            rowKey='id'
            pagination={{ pageSize: 20, total: reportList.totalCount }}
            columns={columns}
            dataSource={reportList.list}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      onGetReportList: (params) => {
        return doGetReportList.request(params);
      },
      onAddReport: (params: IReportAddParam) => {
        return doAddReport.request(params);
      },
      onDeleteReport: (params: number) => {
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
