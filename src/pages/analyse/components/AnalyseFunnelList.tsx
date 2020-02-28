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

const getOptions = (data: IFunnelAnalyseData): ObjectMap => {
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

  data.list.forEach(item => {
    options.series.push({
      type: 'line',
      name: item.dimension,
      data: item.data.map(val => {
        return {
          name: val.time,
          value: [val.time, 11]
        };
      })
    });
  });

  return options;
};

const AnalyseFunnelList = ({ data }: Props) => {
  const hasData = !!data.list.find(item => item.data.length > 0);

  if (!hasData) {
    return <div>暂无数据</div>;
  }

  return (
    <div>
      <ReactEcharts option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default AnalyseFunnelList;
