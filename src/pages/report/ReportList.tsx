import * as React from 'react';
import style from './ReportList.module.less';
import { connect } from 'react-redux';
import { IStoreState, IAction, IPageData } from '@/types';
import { doGetReportList } from '@/store/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Table, Button, Icon, Tooltip } from 'antd';
import { PaginationConfig, SorterResult, ColumnProps } from 'antd/lib/table';
import { IReportListParam, IReportInfo } from '@/api';
import ReportAddModal from './components/ReportAddModal';

interface Props {
  doGetReportList: (params: IReportListParam) => IAction;
  reportList: IPageData<IReportInfo>;
  reportListParams: IReportListParam;
}

const ReportList = ({ reportList, doGetReportList, reportListParams }: Props) => {
  const [addReportVisible, setAddReportVisible] = React.useState(false);

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
      render: (text: any, record: any) => (
        <span>
          <Tooltip title='编辑'>
            <Icon type='edit' />
          </Tooltip>
          &nbsp;
          <Tooltip title='拷贝'>
            <Icon type='copy' />
          </Tooltip>
          &nbsp;
          <Tooltip title='添加副本到看板'>
            <Icon type='plus-square' />
          </Tooltip>
          &nbsp;
          <Tooltip title='删除'>
            <Icon type='delete' />
          </Tooltip>
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

    if (filters.status) {
      params.status = filters.status[0];
    }

    doGetReportList({ ...reportListParams, ...params });
  }

  return (
    <div className={style.wrapper}>
      <ReportAddModal visible={addReportVisible} onClose={setAddReportVisible}></ReportAddModal>
      <div>
        <Button onClick={() => setAddReportVisible(true)}>新增报表</Button>
      </div>
      <Table rowKey='id' columns={columns} dataSource={reportList.list} onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) =>
  bindActionCreators(
    {
      doGetReportList: params => {
        return doGetReportList.request(params);
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
