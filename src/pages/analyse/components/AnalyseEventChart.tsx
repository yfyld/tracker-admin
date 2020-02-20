import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IEventAnalyseData } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit } from '@/utils';

interface Props {
  data: IEventAnalyseData;
}

const getBarOptions = (data: IEventAnalyseData): ObjectMap => {
  const options: ObjectMap = {
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 100
      }
    ],
    /*     minInterval: 28 * 86400000,
    maxInterval: 31 * 86400000, */
    grid: {
      bottom: 80
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

const getLineOptions = (data: IEventAnalyseData): ObjectMap => {
  const options: ObjectMap = {
    // dataZoom: [
    //   {
    //     show: true,
    //     realtime: true,
    //     start: 0,
    //     end: 100
    //   }
    // ],
    /*     minInterval: 28 * 86400000,
    maxInterval: 31 * 86400000, */
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

const getPieOptions = (data: IEventAnalyseData): ObjectMap => {
  const options: ObjectMap = {
    tooltip: {
      show: true
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 10
    },

    series: []
  };

  if (data.dimension) {
    if (data.list.length > 1) {
      let pieData: { value: number; name: string }[] = [];
      data.list.forEach(item => {
        pieData = pieData.concat(
          data.dimensionValues.map((dimension: string) => ({
            name: item.metadataName + '/' + dimension,
            value: item.data.reduce((total, val) => {
              if (val[data.dimension] === dimension) {
                total += Number(val.pv);
              }
              return total;
            }, 0)
          }))
        );
      });
      options.series.push({
        type: 'pie',
        data: pieData
      });
    } else {
      options.series.push({
        type: 'pie',
        name: data.list[0].metadataName,
        data: data.dimensionValues.map(dimension => ({
          name: dimension,
          value: data.list[0].data.reduce((total, item) => {
            if (item[data.dimension] === dimension) {
              total += Number(item.pv);
            }
            return total;
          }, 0)
        }))
      });
    }
  } else {
    options.series.push({
      type: 'pie',
      data: data.list.map(item => ({
        name: item.metadataName,
        value: item.data.reduce((total, val) => {
          total += Number(val.pv);
          return total;
        }, 0)
      }))
    });
    data.list.forEach(item => {});
  }

  return options;
};

const getOptions = (data: IEventAnalyseData) => {
  switch (data.type) {
    case 'PIE':
      return getPieOptions(data);
    case 'BAR':
      return getBarOptions(data);
    default:
      return getLineOptions(data);
  }
};

interface TableColumnProps {
  key: string;
  pv: number;
  time: string;
}

const getColumns = (data: IEventAnalyseData) => {
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

const getTableData = (data: IEventAnalyseData): TableColumnProps[] => {
  const dataBydateMap: { [prop: string]: TableColumnProps } = {};
  if (data.dimension) {
    if (data.list.length > 1) {
    } else {
    }
  } else {
    if (data.list.length > 1) {
      data.list.forEach(indicator => {});
    } else if (data.list.length === 1) {
      return data.list[0].data.map(item => ({
        time: '',
        key: item.time,
        pv: item.pv
      }));
    }

    return Object.values(dataBydateMap);
  }

  // data.list.forEach((aaaaa: any) => {
  //   aaaaa.data.forEach((item: any) => {
  //     if (!date[item.time]) {
  //       date[item.time] = { time: item.time, key: item.time, pv: item.pv };
  //     }
  //     if (data.dimension && data.list.length > 1) {
  //       date[item.time].demension = [];
  //       date[item.time].demension.push({
  //         name: item[data.dimension],
  //         pv: item.pv
  //       });
  //     } else if (data.dimension && data.dimensionValues.length > 0) {
  //       date[item.time][item[data.dimension]] = item.pv;
  //     } else if (data.list.length > 1) {
  //       date[item.time][aaaaa.key] = item.pv;
  //     }
  //   });
  // });
  // return Object.values(date);
};

const AnalyseEventChart = ({ data }: Props) => {
  const hasData = !!data.list.find(item => item.data.length > 0);

  if (!hasData) {
    return <div>暂无数据</div>;
  }

  const compare = data.list.map(item => (
    <div key={item.key}>
      {item.metadataName} 合计:{Number(item.compare.yoyCurrent)} 同比:
      {item.compare.yoyPercentage === 'NaN' ? '--' : Math.floor(Number(item.compare.yoyPercentage) * 100) + '%'}
      环比:
      {item.compare.qoqPercentage === 'NaN' ? '--' : Math.floor(Number(item.compare.qoqPercentage) * 100) + '%'}
    </div>
  ));

  switch (data.type) {
    case 'TEXT':
      return <div>{compare}</div>;
    case 'TABLE': {
      const tableData = getColumns(data);
      const tableScroll = tableData.length > 5 ? { x: tableData.length * 200 } : {};
      return (
        <div>
          {compare}
          <Table columns={tableData} dataSource={getTableData(data)} scroll={tableScroll} />
        </div>
      );
    }

    default:
      return (
        <div>
          {compare}
          <ReactEcharts option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} />
        </div>
      );
  }
};

export default AnalyseEventChart;
