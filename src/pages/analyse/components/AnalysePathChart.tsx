import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IPathAnalyseData } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit, getIndicatorTypeCname } from '@/utils';
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
          return `${params.data.name} \n${getIndicatorTypeCname(data.indicatorType)}:${params.value}次`;
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
          return `${params.data.name.replace(/([\u4e00-\u9fa5]{6})/, '$1\n')}\n\n${getIndicatorTypeCname(
            data.indicatorType
          )}:${params.data.value}次`;
        }
      },
      links: data.links.filter((item) => item.value),
      data: data.data.map((item) => ({ id: item.id, name: item.name, value: item.value }))
    }
  };

  return options;
};

const AnalysePathChart = ({ data }: Props) => {
  return (
    <ReactEcharts style={{ height: '100%' }} option={getOptions(data)} theme='ts' notMerge={true} lazyUpdate={true} />
  );
};

export default AnalysePathChart;
