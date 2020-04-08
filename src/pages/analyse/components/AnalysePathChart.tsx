import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IPathAnalyseData } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit } from '@/utils';
import AnalyseFunnelList from './AnalyseFunnelList';

interface Props {
  data: IPathAnalyseData;
}

const getOptions = (data: IPathAnalyseData): ObjectMap => {
  const options: ObjectMap = {
    tooltip: {
      show: true,

      formatter: (params: any) => {
        if (params.dataType === 'node') {
          return `${params.data.name} (${params.value})`;
        } else {
          return `${params.data.sourceName} -> ${params.data.targetName}: ${params.data.value}(转化率${params.data.conversionRate}%)`;
        }
      }
    },
    series: {
      type: 'sankey',
      layout: 'none',
      focusNodeAdjacency: 'allEdges',
      nodeWidth: 100,
      nodeGap: 100,
      label: {
        position: 'insideTopLeft',
        formatter: (params: any) => {
          return `${params.data.name}(${params.data.value})`;
        }
      },
      links: data.links,
      data: data.data.map(item => ({ id: item.id, name: item.name, value: item.value }))
    }
  };

  return options;
};

const AnalysePathChart = ({ data }: Props) => {
  return <ReactEcharts option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} />;
};

export default AnalysePathChart;
