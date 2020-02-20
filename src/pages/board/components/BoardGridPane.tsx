import * as React from 'react';
import style from './BoardGridPane.module.less';

import { IReportInfo } from '@/api';
import { Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import ChartLine from '@/components/ChartLine';
import DateParse from '@/components/DateParse';
import { ClickParam } from 'antd/lib/menu';
import AnalyseEventChart from '@/pages/analyse/components/AnalyseEventChart';
import BoardChart from './BoardChart';
import { IDate } from '@/types';

interface Props {
  reportInfo: IReportInfo;
  onDeletePane?: (param: number) => any;
  globalDate: IDate;
}

const BoardGridPane = ({ reportInfo, onDeletePane, globalDate }: Props) => {
  const { dateStart, dateEnd } = globalDate;
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
            <DateParse
              dateStart={dateStart || reportInfo.dateStart}
              dateEnd={dateEnd || reportInfo.dateEnd}
              dateType={reportInfo.dateType}
            ></DateParse>
          </div>
        </h3>
        <div className={style.menu}>
          <Dropdown overlay={menu} placement='bottomLeft'>
            <Icon type='menu' />
          </Dropdown>
        </div>
      </div>
      <div className={style.body}>
        <BoardChart type='EVENT' analyseParam={reportInfo.data} globalDate={globalDate}></BoardChart>
      </div>
    </div>
  );
};

export default BoardGridPane;
