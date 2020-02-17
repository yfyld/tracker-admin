import * as React from 'react';
import style from './BoardPane.module.less';

import { IReportInfo } from '@/api';
import { Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';
import { ClickParam } from 'antd/lib/menu';
import AnalyseEventChart from '@/pages/analyse/components/AnalyseEventChart';
import BoardChart from './BoardChart';

interface Props {
  reportInfo: IReportInfo;
  onDeletePane: (param: number) => any;
  startDate?: number;
  endDate?: number;
}

const BoardPane = ({ reportInfo, onDeletePane }: Props) => {
  const { dateStart, dateEnd, dateType } = reportInfo;

  console.log(reportInfo.data);

  const handleClickMenu = ({ key }: ClickParam) => {
    if (key === 'REMOVE') {
      onDeletePane(reportInfo.id);
    }
  };
  const menu = (
    <Menu onClick={handleClickMenu}>
      <Menu.Item>设置</Menu.Item>
      <Menu.Item>
        <Link to={`/project/analyse/event?reportId=${reportInfo.id}&projectId=${reportInfo.projectId}`}>编辑</Link>
      </Menu.Item>
      <Menu.Item key='REMOVE'>删除</Menu.Item>
    </Menu>
  );
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>
          {reportInfo.name}
          <div className={style.time}>
            <DateParse dateStart={dateStart} dateEnd={dateEnd} dateType={dateType}></DateParse>
          </div>
        </h3>
        <div className={style.menu}>
          <Dropdown overlay={menu} placement='bottomLeft'>
            <Icon type='menu' />
          </Dropdown>
        </div>
      </div>
      <div className={style.body}>
        <BoardChart type='EVENT' analyseParam={reportInfo.data}></BoardChart>
      </div>
    </div>
  );
};

export default BoardPane;
