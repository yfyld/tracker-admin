import * as React from 'react';
import style from './BoardChart.module.less';

import { IReportInfo, fetchEventAnalyseData, IEventAnalyseData } from '@/api';
import { Icon, Dropdown, Menu, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';
import { ClickParam } from 'antd/lib/menu';
import AnalyseEventChart from '@/pages/analyse/components/AnalyseEventChart';

interface Props {
  analyseParam: any;
  type: string;
}

const BoardChart = ({ type, analyseParam }: Props) => {
  const [data, setdata] = React.useState<IEventAnalyseData>({
    list: [],
    dimension: '',
    dimensionValues: [],
    timeUnit: 'DAY',
    type: 'LINE'
  });
  const [loading, setloading] = React.useState(false);

  React.useEffect(() => {
    setloading(true);
    fetchEventAnalyseData(analyseParam).then(res => {
      setdata(res.data);
      setloading(false);
    });
  }, [analyseParam]);

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
