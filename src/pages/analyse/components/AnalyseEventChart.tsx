import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit } from '@/utils';

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

const getColumns = (data: any) => {
  let columns: ColumnProps<TableColumnProps>[] = [
    {
      title: '日期',
      key: 'time',
      dataIndex: 'time',
      fixed: 'left',
      width: 200,
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.time - b.time,
      render: (text: number) => moment(text).format(getFormatByTimeUnit(data.timeUnit))
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
        date[item.time].demension = [];
        date[item.time].demension.push({
          name: item[data.dimension],
          pv: item.pv
        });
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

  const tableData = getColumns(data);
  const tableScroll = tableData.length > 5 ? { x: tableData.length * 200 } : {};

  return (
    <div>
      {data.list.map((item: any) => (
        <div>
          {item.metadataName} 合计:{Number(item.compare.yoyCurrent)} 同比:
          {item.compare.yoyPercentage === 'NaN' ? '--' : Math.floor(Number(item.compare.yoyPercentage) * 100) + '%'}
          环比:
          {item.compare.qoqPercentage === 'NaN' ? '--' : Math.floor(Number(item.compare.qoqPercentage) * 100) + '%'}
        </div>
      ))}
      {hasData ? <ReactEcharts option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} /> : '暂无数据'}

      <Table columns={tableData} dataSource={getTableData(data)} scroll={tableScroll} />
    </div>
  );
};

export default AnalyseEventChart;
