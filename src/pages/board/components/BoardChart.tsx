import * as React from 'react';
import style from './BoardChart.module.less';

import {
  IReportInfo,
  fetchEventAnalyseData,
  IEventAnalyseData,
  IEventAnalyseParam,
  IFunnelAnalyseData,
  IFunnelAnalyseParam,
  fetchFunnelAnalyseData
} from '@/api';
import { Icon, Dropdown, Menu, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';
import { ClickParam } from 'antd/lib/menu';
import AnalyseEventChart from '@/pages/analyse/components/AnalyseEventChart';
import { IDate } from '@/types';
import AnalyseFunnelChart from '@/pages/analyse/components/AnalyseFunnelChart';

interface Props {
  analyseParam: any;
  type: string;
  globalDate: IDate;
  refresh: number;
}

const BoardChart = ({ type, analyseParam, globalDate, refresh }: Props) => {
  const [data, setdata] = React.useState<IEventAnalyseData | IFunnelAnalyseData>({
    list: [],
    dimension: '',
    dimensionValues: [],
    timeUnit: 'DAY',
    type: 'LINE'
  });
  const [loading, setloading] = React.useState(false);
  const { dateEnd, dateStart } = globalDate;
  React.useEffect(() => {
    setloading(true);
    switch (type) {
      case 'EVENT':
        {
          let newParam: IEventAnalyseParam = JSON.parse(JSON.stringify(analyseParam));
          if (dateEnd && dateStart) {
            newParam = { ...newParam, dateEnd, dateStart, dateType: '' };
          }
          fetchEventAnalyseData(newParam).then(res => {
            setdata(res.data);
            setloading(false);
          });
        }

        break;
      case 'FUNNEL':
        {
          let newParam: IFunnelAnalyseParam = JSON.parse(JSON.stringify(analyseParam));
          if (dateEnd && dateStart) {
            newParam = { ...newParam, dateEnd, dateStart, dateType: '' };
          }
          fetchFunnelAnalyseData(newParam).then(res => {
            setdata(res.data);
            setloading(false);
          });
        }

        break;

      default:
        break;
    }
  }, [analyseParam, globalDate, refresh]);

  switch (type) {
    case 'EVENT':
      return (
        <Spin spinning={loading}>
          <AnalyseEventChart data={data as IEventAnalyseData}></AnalyseEventChart>
        </Spin>
      );
    case 'FUNNEL':
      return (
        <Spin spinning={loading}>
          <AnalyseFunnelChart data={data as IFunnelAnalyseData}></AnalyseFunnelChart>
        </Spin>
      );
    default:
      return <div>无效数据</div>;
      break;
  }
};

export default BoardChart;
