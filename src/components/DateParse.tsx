import * as React from 'react';
import {
  getWeekStartDate,
  getMonthStartDate,
  getLastMonthStartDate,
  getLastMonthEndDate,
  getQuarterStartDate,
  getLastQuarterStartDate,
  getYearStartDate,
  getLastYearStartDate
} from '@/utils';
import { Divider } from 'antd';
import moment from 'moment';

interface Props {
  dateStart?: number;
  dateEnd?: number;
  dateType: string;
}

export default function DateParse({ dateStart, dateEnd, dateType }: Props) {
  if (typeof dateStart === 'string') {
    dateStart = Number(dateStart);
    dateEnd = Number(dateEnd);
  }
  const now = new Date().setHours(23, 59, 59, 999);
  let type = '';
  if (dateType === 'STATIC') {
  } else if (dateType === 'TODAY') {
    dateStart = new Date().setHours(0, 0, 0, 0);
    dateEnd = now;
    type = '今天';
  } else if (dateType === 'DAY') {
    dateStart = new Date().setHours(0, 0, 0, 0);
    dateEnd = now;
    type = '今天';
  } else if (dateType === 'WEEK') {
    dateStart = getWeekStartDate();
    dateEnd = now;
    type = '本周';
  } else if (dateType === 'MONTH') {
    dateStart = getMonthStartDate();
    dateEnd = now;
    type = '本月';
  } else if (dateType === 'LAST_MONTH') {
    dateStart = getLastMonthStartDate();
    dateEnd = getLastMonthEndDate();
    type = '上个月';
  } else if (dateType === 'QUARTER') {
    dateStart = getQuarterStartDate();
    dateEnd = now;
    type = '本季度';
  } else if (dateType === 'LAST_QUARTER') {
    dateStart = getLastQuarterStartDate();
    dateEnd = getQuarterStartDate() - 1;
    type = '上季度';
  } else if (dateType === 'YEAR') {
    dateStart = getYearStartDate();
    dateEnd = now;
    type = '今年';
  } else if (dateType === 'LAST_YEAR') {
    dateStart = getLastYearStartDate();
    dateEnd = getYearStartDate() - 1;
    type = '去年';
  } else if (dateType === 'RECENT_3_DAY') {
    dateStart = new Date().setHours(0, 0, 0, 0) - 3 * 86400000;
    dateEnd = new Date().setHours(23, 59, 59, 999);
    type = '最近3天';
  } else if (dateType === 'RECENT_7_DAY') {
    dateStart = new Date().setHours(0, 0, 0, 0) - 7 * 86400000;
    dateEnd = new Date().setHours(23, 59, 59, 999);
    type = '最近7天';
  } else if (dateType === 'RECENT_15_DAY') {
    dateStart = new Date().setHours(0, 0, 0, 0) - 15 * 86400000;
    dateEnd = new Date().setHours(23, 59, 59, 999);
    type = '最近15天';
  }

  return (
    <span>
      <span>{moment(dateStart).format('YYYY-MM-DD')}</span>&nbsp;~&nbsp;
      <span>{moment(dateEnd).format('YYYY-MM-DD')}</span>
      {type && (
        <span>
          <Divider type='vertical' />
          {type}
        </span>
      )}
    </span>
  );
}
