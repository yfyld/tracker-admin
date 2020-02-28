import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IFunnelAnalyseData } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit } from '@/utils';
import AnalyseFunnelList from './AnalyseFunnelList';

interface Props {
  data: IFunnelAnalyseData;
}

const getOptions = (data: IFunnelAnalyseData): ObjectMap => {
  const options: ObjectMap = {
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',

        minSize: '0%',
        maxSize: '100%',
        sort: 'none',
        gap: 2,

        label: {
          show: true,
          position: 'inside',
          formatter: function(param: any) {
            return `${param.name}(${param.value})`;
          }
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: data.list[0].allData.map(item => ({
          name: item.customName || item.metadataName,
          value: item.count
        }))
      }
    ]
  };

  return options;
};

interface TableColumnProps {
  key: string;
  pv: number;
  time: string;
}

const getColumns = (data: IFunnelAnalyseData) => {
  let columns: ColumnProps<TableColumnProps>[] = [
    {
      title: '日期',
      key: 'time',
      dataIndex: 'time',
      fixed: 'left',
      width: 200,
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
      render: (text: number) => moment(text).format(getFormatByTimeUnit(data.timeUnit))
    }
  ];

  return columns;
};

const getTableData = (data: IFunnelAnalyseData): TableColumnProps[] => {
  const dataBydateMap: { [prop: string]: TableColumnProps } = {};

  return Object.values(dataBydateMap);
};

const AnalyseFunnelChart = ({ data }: Props) => {
  const hasData = !!data.list.find(item => item.allData.length > 0);

  if (!hasData) {
    return <div>暂无数据</div>;
  }

  switch (data.type) {
    case 'TABLE': {
      const tableData = getColumns(data);
      const tableScroll = tableData.length > 5 ? { x: tableData.length * 200 } : {};
      return (
        <div>
          <Table columns={tableData} dataSource={getTableData(data)} scroll={tableScroll} />
        </div>
      );
    }

    case 'LIST': {
      return (
        <div>
          <AnalyseFunnelList data={data}></AnalyseFunnelList>
        </div>
      );
    }

    default:
      return (
        <div>
          <ReactEcharts option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} />
        </div>
      );
  }
};

export default AnalyseFunnelChart;
