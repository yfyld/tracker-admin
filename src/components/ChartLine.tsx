import * as React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function ChartLine() {
  const getOption = () => ({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }
    ]
  });

  const handleChartReady = () => {};

  return <ReactEcharts option={getOption()} notMerge={true} lazyUpdate={true} onChartReady={handleChartReady} />;
}
