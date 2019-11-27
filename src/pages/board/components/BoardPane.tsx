import * as React from 'react';
import style from './BoardPane.module.less';

import { IReportInfo } from '@/api';
import { Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';

interface Props {
  reportInfo: IReportInfo;
  startDate?: number;
  endDate?: number;
}

const BoardPane = ({ reportInfo }: Props) => {
  const { dateStart, dateEnd, dateType } = reportInfo;
  const menu = (
    <Menu>
      <Menu.Item>设置</Menu.Item>
      <Menu.Item>
        <Link to={`/project/analyse-event?reportId=${reportInfo.id}&projectId=${reportInfo.projectId}`}>编辑</Link>
      </Menu.Item>
      <Menu.Item>删除</Menu.Item>
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
        <div>{reportInfo.description}</div>
        <div>
          <ChartLine></ChartLine>
        </div>
      </div>
    </div>
  );
};

export default BoardPane;
