import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IEventAnalyseData } from '@/api';

import style from './AnalyseEventChart.module.less';

import { getFormatByTimeUnit, dayjs, getIndicatorTypeCname } from '@/utils';
import { COLOR } from '@/constants';
import NoData from '@/components/NoData';

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
      data.list.forEach((item) => {
        data.dimensionValues.forEach((dimension) => {
          options.series.push({
            type: 'line',
            name: item.metadataName + '/' + dimension,
            data: item.data
              .filter((val) => val[data.dimension] === dimension)
              .map((val) => {
                return {
                  name: item.metadataName + '/' + dimension,
                  value: [val.time, Number(val.count)]
                };
              })
          });
        });
      });
    } else {
      data.dimensionValues.forEach((dimension) => {
        options.series.push({
          type: 'line',
          name: dimension,
          data: data.list[0].data
            .filter((val) => val[data.dimension] === dimension)
            .map((val) => {
              return {
                name: data.list[0].metadataName + '/' + dimension,
                value: [val.time, Number(val.count)]
              };
            })
        });
      });
    }
  } else {
    data.list.forEach((item) => {
      options.series.push({
        type: 'line',
        name: item.metadataName,
        data: item.data.map((val) => {
          return {
            name: item.metadataName,
            value: [val.time, Number(val.count)]
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
      data.list.forEach((item) => {
        data.dimensionValues.forEach((dimension) => {
          options.series.push({
            type: 'line',
            symbolSize: '2',

            name: item.metadataName + '/' + dimension,
            data: item.data
              .filter((val) => val[data.dimension] === dimension)
              .map((val) => {
                return {
                  name: item.metadataName + '/' + dimension,
                  value: [val.time, Number(val.count)]
                };
              })
          });
        });
      });
    } else {
      data.dimensionValues.forEach((dimension) => {
        options.series.push({
          type: 'line',
          symbolSize: '2',

          name: dimension,
          data: data.list[0].data
            .filter((val) => val[data.dimension] === dimension)
            .map((val) => {
              return {
                name: data.list[0].metadataName + '/' + dimension,
                value: [val.time, Number(val.count)]
              };
            })
        });
      });
    }
  } else {
    data.list.forEach((item) => {
      options.series.push({
        type: 'line',
        symbolSize: '2',

        name: item.metadataName,
        data: item.data.map((val) => {
          return {
            name: item.metadataName,
            value: [val.time, Number(val.count)]
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
      right: 10
    },

    series: []
  };

  if (data.dimension) {
    if (data.list.length > 1) {
      let pieData: { value: number; name: string }[] = [];
      data.list.forEach((item) => {
        pieData = pieData.concat(
          data.dimensionValues.map((dimension: string) => ({
            name: item.metadataName + '/' + dimension,
            value: item.data.reduce((total, val) => {
              if (val[data.dimension] === dimension) {
                total += Number(val.count);
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
        data: data.dimensionValues.map((dimension) => ({
          name: dimension,
          value: data.list[0].data.reduce((total, item) => {
            if (item[data.dimension] === dimension) {
              total += Number(item.count);
            }
            return total;
          }, 0)
        }))
      });
    }
  } else {
    options.series.push({
      type: 'pie',
      data: data.list.map((item) => ({
        name: item.metadataName,
        value: item.data.reduce((total, val) => {
          total += Number(val.count);
          return total;
        }, 0)
      }))
    });
    data.list.forEach((item) => {});
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
  count: number;
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
      render: (text: number) => dayjs(text).format(getFormatByTimeUnit(data.timeUnit))
    }
  ];

  if (data.dimension) {
    if (data.list.length > 1) {
      columns.push({
        key: 'count',
        title: '总次数',
        dataIndex: 'count'
      });
    } else {
      columns = columns.concat(
        data.dimensionValues.map((item) => ({
          key: item,
          title: item,
          dataIndex: item
        }))
      );
    }
  } else {
    if (data.list.length > 1) {
      columns = columns.concat(
        data.list.map((item) => ({
          key: item.key,
          title: item.metadataName,
          dataIndex: item.key
        }))
      );
    } else {
      columns.push({
        key: 'count',
        title: '总次数',
        dataIndex: 'count'
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
      data.list.forEach((indicator) => {});
    } else if (data.list.length === 1) {
      return data.list[0].data.map((item) => ({
        time: item.time,
        key: item.time,
        count: item.count
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
  const hasData = !!data.list.find((item) => item.data.length > 0);

  if (!hasData) {
    return <NoData></NoData>;
  }

  const compare = (
    <div className={style.compare}>
      {data.list.map((item) => (
        <div key={item.key} className={style.compareItem}>
          <p>{item.metadataName}</p>
          <p>
            {getIndicatorTypeCname(data.type)}: <strong>{Number(item.compare.yoyCurrent)} </strong>{' '}
          </p>
          <p>
            同比:
            <span style={{ color: Number(item.compare.qoqPercentage) > 0 ? COLOR.success : COLOR.danger }}>
              {' '}
              {item.compare.yoyPercentage === 'NaN' ? '--' : Math.floor(Number(item.compare.yoyPercentage) * 100) + '%'}
            </span>
            &emsp; 环比:
            <span style={{ color: Number(item.compare.qoqPercentage) > 0 ? COLOR.success : COLOR.danger }}>
              {item.compare.qoqPercentage === 'NaN' ? '--' : Math.floor(Number(item.compare.qoqPercentage) * 100) + '%'}
            </span>
          </p>
        </div>
      ))}
    </div>
  );

  switch (data.type) {
    case 'TEXT':
      return <div>{compare}</div>;
    case 'TABLE': {
      const tableData = getColumns(data);
      const tableScroll = tableData.length > 5 ? { x: tableData.length * 200 } : {};
      return (
        <div className={style.content}>
          {compare}
          <div className={style.main}>
            <Table columns={tableData} dataSource={getTableData(data)} scroll={tableScroll} />
          </div>
        </div>
      );
    }

    default:
      return (
        <div className={style.content}>
          {compare}
          <div className={style.main}>
            <ReactEcharts
              style={{ height: '100%' }}
              option={getOptions(data)}
              theme='ts'
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
        </div>
      );
  }
};

export default AnalyseEventChart;
