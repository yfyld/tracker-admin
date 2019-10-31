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
  const now = new Date().setHours(23, 59, 59, 999);
  let type = '';
  if (dateType === 'STATIC') {
  } else if (dateType === 'TODAY') {
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
