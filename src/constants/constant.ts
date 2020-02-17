import {
  getWeekStartDate,
  getMonthStartDate,
  getLastMonthStartDate,
  getLastMonthEndDate,
  getQuarterStartDate,
  getLastQuarterStartDate,
  getYearStartDate,
  getLastYearStartDate,
  getLastYearEndDate,
  getLastQuarterEndDate
} from '@/utils';

export const CACHE_TIME: number = 30000;

export const ADD_BROAD: string = 'ADD_BROAD';

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export const ROUTE_PATH = {
  myBoard: '/my-board',
  projectList: '/project-list',
  projectInfo: '/project/info',
  metadataList: '/project/metadata-list',
  analyseEvent: '/project/analyse/event',
  board: '/project/board',
  reportList: '/project/report-list',
  draft: '/project/draft',
  teamList: '/team-list',
  login: '/login',
  teamInfo: '/team-info',
  signup: '/signup',
  home: '/home',
  userManage: '/admin/user-manage',
  roleManage: '/admin/role-manage',
  permissionManage: '/admin/permission-manage'
};

export interface IDynamicTime {
  name: string;
  startDate: () => number;
  endDate: () => number;
  value: string;
}
export const DYNAMIC_TIME: IDynamicTime[] = [
  {
    name: '当天',
    startDate: () => new Date().setHours(0, 0, 0, 0),
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'DAY'
  },
  {
    name: '最近3天',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 3 * 86400000,
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'RECENT_3_DAY'
  },
  {
    name: '最近7天',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 7 * 86400000,
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'RECENT_7_DAY'
  },
  {
    name: '本周',
    startDate: () => getWeekStartDate(),
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'WEEK'
  },
  {
    name: '上周',
    startDate: () => getWeekStartDate() - 7 * 86400000,
    endDate: () => getWeekStartDate(),
    value: 'LAST_WEEK'
  },
  {
    name: '最近15天',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 15 * 86400000,
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'RECENT_15_DAY'
  },
  {
    name: '本月',
    startDate: () => getMonthStartDate(),
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'MONTH'
  },
  {
    name: '上个月',
    startDate: () => getLastMonthStartDate(),
    endDate: () => getLastMonthEndDate(),
    value: 'LAST_MONTH'
  },
  {
    name: '本季度',
    startDate: () => getQuarterStartDate(),
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'QUARTER'
  },
  {
    name: '上季度',
    startDate: () => getLastQuarterStartDate(),
    endDate: () => getLastQuarterEndDate(),
    value: 'LAST_QUARTER'
  },
  {
    name: '半年',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 183 * 86400000,
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'HALF_YEAR'
  },
  {
    name: '本年',
    startDate: () => getYearStartDate(),
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'YEAR'
  },
  {
    name: '去年',
    startDate: () => getLastYearStartDate(),
    endDate: () => getLastYearEndDate(),
    value: 'LAST_YEAR'
  }
];
