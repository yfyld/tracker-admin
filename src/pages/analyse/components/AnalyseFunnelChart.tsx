import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IFunnelAnalyseData } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit } from '@/utils';

interface Props {
  data: IFunnelAnalyseData;
}

const getLineOptions = (data: IFunnelAnalyseData): ObjectMap => {
  const options: ObjectMap = {
    grid: {
      bottom: 60,
      top: 20
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: true,
      bottom: 0
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

  if (data.dimension) {
    if (data.list.length > 1) {
      data.list.forEach(item => {
        data.dimensionValues.forEach(dimension => {
          options.series.push({
            type: 'line',
            name: item.metadataName + '/' + dimension,
            data: item.data
              .filter(val => val[data.dimension] === dimension)
              .map(val => {
                return {
                  name: item.metadataName + '/' + dimension,
                  value: [val.time, Number(val.pv)]
                };
              })
          });
        });
      });
    } else {
      data.dimensionValues.forEach(dimension => {
        options.series.push({
          type: 'line',
          name: dimension,
          data: data.list[0].data
            .filter(val => val[data.dimension] === dimension)
            .map(val => {
              return {
                name: data.list[0].metadataName + '/' + dimension,
                value: [val.time, Number(val.pv)]
              };
            })
        });
      });
    }
  } else {
    data.list.forEach(item => {
      options.series.push({
        type: 'line',
        name: item.metadataName,
        data: item.data.map(val => {
          return {
            name: item.metadataName,
            value: [val.time, Number(val.pv)]
          };
        })
      });
    });
  }

  return options;
};

const getFunnelOptions = (data: IFunnelAnalyseData): ObjectMap => {
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
        data: data.list.map(item => ({
          name: item.customName || item.metadataName,
          value: Number(item.count)
        }))
      }
    ]
  };

  return options;
};

const getOptions = (data: IFunnelAnalyseData) => {
  switch (data.type) {
    case 'FUNNEL':
      return getFunnelOptions(data);

    default:
      return getLineOptions(data);
  }
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

  if (data.dimension) {
    if (data.list.length > 1) {
      columns.push({
        key: 'pv',
        title: '总次数',
        dataIndex: 'pv'
      });
    } else {
      columns = columns.concat(
        data.dimensionValues.map(item => ({
          key: item,
          title: item,
          dataIndex: item
        }))
      );
    }
  } else {
    if (data.list.length > 1) {
      columns = columns.concat(
        data.list.map(item => ({
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

const getTableData = (data: IFunnelAnalyseData): TableColumnProps[] => {
  const dataBydateMap: { [prop: string]: TableColumnProps } = {};

  return Object.values(dataBydateMap);
};

const AnalyseFunnelChart = ({ data }: Props) => {
  const hasData = !!data.list.find(item => item.data.length > 0);

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

    default:
      return (
        <div>
          <ReactEcharts option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} />
        </div>
      );
  }
};

export default AnalyseFunnelChart;
