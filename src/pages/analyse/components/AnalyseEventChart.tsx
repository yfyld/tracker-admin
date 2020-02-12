import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam } from '@/api';

interface Props {
  data: any;
  param: IEventAnalyseParam;
}

const getOptions = (data: any): ObjectMap => {
  const options: ObjectMap = {
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 100
      }
    ],
    minInterval: 28 * 86400000,
    maxInterval: 31 * 86400000,
    grid: {
      bottom: 80
    },
    xAxis: {
      type: 'time',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#DDD'
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      nameTextStyle: {
        color: '#999'
      },
      splitArea: {
        show: false
      }
    },
    series: []
  };

  data.list.forEach((item: any) => {
    options.series.push({
      type: 'line',
      data: item.data.map((val: any) => {
        return {
          name: val.time,
          value: [val.time, Number(val.pv)]
        };
      })
    });
  });

  return options;
};

interface TableColumnProps {
  key: string;
  pv: number;
  time: number;
}

const getColumns = (data: any, param: any) => {
  let columns: ColumnProps<TableColumnProps>[] = [
    {
      title: '日期',
      key: 'time',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.time - b.time
    }
  ];

  if (data.dimension) {
    if (data.list.length > 1) {
      columns.push({
        key: 'pv',
        title: '总次数',
        dataIndex: 'pv'
      });
    } else {
      columns = columns.concat(
        data.dimensionValues.map((item: any) => ({
          key: item,
          title: item,
          dataIndex: item
        }))
      );
    }
  } else {
    if (data.list.length > 1) {
      columns = columns.concat(
        data.list.map((item: any) => ({
          key: item.key,
          title: item.metadataName,
          dataIndex: item.key
        }))
      );
    } else {
      columns.push({
        key: 'pv',
        title: '总次数',
        dataIndex: 'pv'
      });
    }
  }

  return columns;
};

const getTableData = (data: any): TableColumnProps[] => {
  const date: any = {};
  data.list.forEach((aaaaa: any) => {
    aaaaa.data.forEach((item: any) => {
      if (!date[item.time]) {
        date[item.time] = { time: item.time, key: item.time, pv: item.pv };
      }
      if (data.dimension && data.list.length > 1) {
        date[item.time][aaaaa.key + data.dimension] = item.pv;
      } else if (data.dimension && data.dimensionValues.length > 0) {
        date[item.time][item[data.dimension]] = item.pv;
      } else if (data.list.length > 1) {
        date[item.time][aaaaa.key] = item.pv;
      }
    });
  });
  return Object.values(date);
};

const AnalyseEventChart = ({ data, param }: Props) => {
  const hasData = !!data.list.find((item: any) => item.data.length > 0);

  return (
    <div>
      {hasData ? <ReactEcharts option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} /> : '暂无数据'}

      <Table columns={getColumns(data, param)} dataSource={getTableData(data)} />
    </div>
  );
};

export default AnalyseEventChart;
