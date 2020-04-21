import * as React from 'react';
import ReactEcharts, { ObjectMap } from 'echarts-for-react';
import { Table, Row, Col } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IEventAnalyseParam, IFunnelAnalyseData } from '@/api';
import moment from 'moment';
import { getFormatByTimeUnit, getIndicatorTypeCname } from '@/utils';
import style from './AnalyseFunnelList.module.less';
import { COLOR } from '@/constants';
import NoData from '@/components/NoData';

interface Props {
  data: IFunnelAnalyseData;
}

const getOptions = (data: IFunnelAnalyseData, step: string): ObjectMap => {
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

  data.list.forEach((item) => {
    options.series.push({
      type: 'line',
      name: item.dimension,
      data: item.data.map((val) => {
        return {
          name: val.time,
          value: [val.time, val.conversionRateMap[step]]
        };
      })
    });
  });

  return options;
};

const svgArrow = (conversionRate: number, active: boolean, title?: string) => {
  if (!title) {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='120' height='70'>
        <path fill='#fff' d='M-1 -1H121V71H-1z'></path>
        <path
          fill={active ? COLOR.primary : '#ddd'}
          fillOpacity='null'
          stroke='#ccc'
          strokeWidth='1'
          d='M118.7 5.92v41.638L59.826 61.437.95 47.557V5.92L59.826 19.8 118.7 5.92z'
        ></path>
        <text
          x='51.486'
          y='55.46'
          fill={active ? '#fff' : '#333'}
          stroke='#000'
          strokeOpacity='null'
          strokeWidth='0'
          fontFamily='Helvetica, Arial, sans-serif'
          fontSize='22'
          textAnchor='start'
          transform='matrix(.66869 0 0 .66869 9.877 6.502)'
          xmlSpace='preserve'
        >
          {conversionRate}%
        </text>
      </svg>
    );
  }

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='120' height='72'>
      <path fill='#fff' d='M-1 -1H121V73H-1z'></path>
      <path
        fill={active ? COLOR.primary : '#ddd'}
        stroke='#ccc'
        strokeWidth='1'
        d='M118.898 9.098V42.48l-59.1 27.818L.698 42.48V9.098h118.2z'
      ></path>
      <text
        x='26.4'
        y='30.253'
        fill={active ? '#fff' : '#333'}
        stroke='#000'
        strokeOpacity='null'
        strokeWidth='0'
        fontFamily='Helvetica, Arial, sans-serif'
        fontSize='16'
        textAnchor='start'
        xmlSpace='preserve'
      >
        {title}
      </text>
      <text
        x='41.4'
        y='49.681'
        fill={active ? '#fff' : '#333'}
        stroke='#000'
        strokeOpacity='null'
        strokeWidth='0'
        fontFamily='Helvetica, Arial, sans-serif'
        fontSize='16'
        textAnchor='start'
        xmlSpace='preserve'
      >
        {conversionRate}%
      </text>
    </svg>
  );
};

const AnalyseFunnelList = ({ data }: Props) => {
  const [step, setstep] = React.useState('_ALL');
  const hasData = !!data.list.find((item) => item.data.length > 0);

  if (!hasData) {
    return <NoData></NoData>;
  }

  return (
    <div>
      <Row gutter={10}>
        <Col span={8}>
          <div>
            {data.list[0].allData.map((item, index) => (
              <div key={item.key}>
                {index === 0 ? (
                  <div className={style.arrow} onClick={() => setstep('_ALL')}>
                    {svgArrow(data.conversionRate, step === '_ALL', '总转化率')}
                  </div>
                ) : (
                  <div className={style.arrow} onClick={() => setstep(item.key)}>
                    {svgArrow(item.conversionRate, step === item.key)}
                  </div>
                )}
                <div className={style.block}>
                  <span>{item.customName || item.metadataName}</span>
                  <span>
                    {getIndicatorTypeCname(data.indicatorType)}
                    {item.count}次
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col span={16}>
          <ReactEcharts option={getOptions(data, step)} theme='ts' notMerge={true} lazyUpdate={true} />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyseFunnelList;
