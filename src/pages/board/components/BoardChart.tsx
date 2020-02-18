import * as React from 'react';
import style from './BoardChart.module.less';

import { IReportInfo, fetchEventAnalyseData, IEventAnalyseData, IEventAnalyseParam } from '@/api';
import { Icon, Dropdown, Menu, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';
import { ClickParam } from 'antd/lib/menu';
import AnalyseEventChart from '@/pages/analyse/components/AnalyseEventChart';
import { IDate } from '@/types';

interface Props {
  analyseParam: any;
  type: string;
  globalDate: IDate;
}

const BoardChart = ({ type, analyseParam, globalDate }: Props) => {
  const [data, setdata] = React.useState<IEventAnalyseData>({
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
    const newParam = JSON.parse(JSON.stringify(analyseParam));
    if (type === 'EVENT') {
      let newParam: IEventAnalyseParam = JSON.parse(JSON.stringify(analyseParam));
      if (dateEnd && dateStart) {
        newParam = { ...newParam, dateEnd, dateStart, dateType: '' };
      }
      fetchEventAnalyseData(newParam).then(res => {
        setdata(res.data);
        setloading(false);
      });
    }
  }, [analyseParam, globalDate]);

  switch (type) {
    case 'EVENT':
      return (
        <Spin spinning={loading}>
          <AnalyseEventChart data={data as IEventAnalyseData}></AnalyseEventChart>
        </Spin>
      );

    default:
      break;
  }
};

export default BoardChart;
