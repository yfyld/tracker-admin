import * as React from 'react';
import style from './BoardChart.module.less';

import {
  IReportInfo,
  fetchEventAnalyseData,
  IEventAnalyseData,
  IEventAnalyseParam,
  IFunnelAnalyseData,
  IFunnelAnalyseParam,
  fetchFunnelAnalyseData,
  IPathAnalyseData,
  fetchPathAnalyseData,
  IPathAnalyseParam
} from '@/api';
import { Icon, Dropdown, Menu, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';
import { ClickParam } from 'antd/lib/menu';
import AnalyseEventChart from '@/pages/analyse/components/AnalyseEventChart';
import { IDate } from '@/types';
import AnalyseFunnelChart from '@/pages/analyse/components/AnalyseFunnelChart';
import AnalysePathChart from '@/pages/analyse/components/AnalysePathChart';

interface Props {
  analyseParam: any;
  type: string;
  globalDate: IDate;
  refresh: number;
}

const BoardChart = ({ type, analyseParam, globalDate, refresh }: Props) => {
  const [data, setdata] = React.useState<IEventAnalyseData | IFunnelAnalyseData | IPathAnalyseData>(null);
  const [loading, setloading] = React.useState(false);
  const { dateEnd, dateStart } = globalDate;
  const [cache, setcache] = React.useState(null);
  React.useEffect(() => {
    const paramStr = JSON.stringify([analyseParam, globalDate, refresh]);
    if (cache === paramStr) {
      return;
    }
    setloading(true);
    setcache(paramStr);
    switch (type) {
      case 'EVENT':
        {
          let newParam: IEventAnalyseParam = JSON.parse(JSON.stringify(analyseParam));
          if (dateEnd && dateStart) {
            newParam = { ...newParam, dateEnd, dateStart, dateType: '' };
          }
          fetchEventAnalyseData(newParam).then((res) => {
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
          fetchFunnelAnalyseData(newParam).then((res) => {
            setdata(res.data);
            setloading(false);
          });
        }
        break;
      case 'PATH':
        {
          let newParam: IPathAnalyseParam = JSON.parse(JSON.stringify(analyseParam));
          if (dateEnd && dateStart) {
            newParam = { ...newParam, dateEnd, dateStart, dateType: '' };
          }
          fetchPathAnalyseData(newParam).then((res) => {
            setdata(res.data);
            setloading(false);
          });
        }

        break;

      default:
        break;
    }
  }, [analyseParam, globalDate, refresh]);

  if (!data) {
    return (
      <Spin spinning={true}>
        <div style={{ width: '100%', height: '100%' }}></div>
      </Spin>
    );
  }

  switch (type) {
    case 'EVENT':
      return (
        <Spin spinning={loading} wrapperClassName='app-spin-fill'>
          <AnalyseEventChart data={data as IEventAnalyseData}></AnalyseEventChart>
        </Spin>
      );
    case 'FUNNEL':
      return (
        <Spin spinning={loading} wrapperClassName='app-spin-fill'>
          <AnalyseFunnelChart data={data as IFunnelAnalyseData}></AnalyseFunnelChart>
        </Spin>
      );
    case 'PATH':
      return (
        <Spin spinning={loading} wrapperClassName='app-spin-fill'>
          <AnalysePathChart data={data as IPathAnalyseData}></AnalysePathChart>
        </Spin>
      );
    default:
      return <div>无效数据</div>;
      break;
  }
};

export default BoardChart;
