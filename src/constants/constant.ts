import { IFieldInfo } from '@/api';
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
  boardDetail: '/board',
  projectList: '/project-list',
  projectInfo: '/project/info',
  metadataList: '/project/metadata-list',
  analyseEvent: '/project/analyse/event',
  analyseFunnel: '/project/analyse/funnel',
  analysePath: '/project/analyse/path',
  board: '/project/board',
  boardList: '/project/board-list',
  reportList: '/project/report-list',
  draft: '/project/draft',
  teamList: '/team-list',
  login: '/login',
  teamInfo: '/team-info',
  signup: '/signup',
  home: '/home',
  userManage: '/admin/user-manage',
  roleManage: '/admin/role-manage',
  permissionManage: '/admin/permission-manage',
  custom: '/project/query',
  userTimeline: '/project/user-timeline'
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
    value: 'TODAY'
  },

  {
    name: '昨天',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 1 * 86400000,
    endDate: () => new Date().setHours(23, 59, 59, 999) - 1 * 86400000,
    value: 'YESTERDAY'
  },

  {
    name: '最近3天',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 2 * 86400000,
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'RECENT_3_DAY'
  },
  {
    name: '最近7天',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 6 * 86400000,
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
    startDate: () => new Date().setHours(0, 0, 0, 0) - 14 * 86400000,
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
    name: '最近30天',
    startDate: () => new Date().setHours(0, 0, 0, 0) - 29 * 86400000,
    endDate: () => new Date().setHours(23, 59, 59, 999),
    value: 'RECENT_30_DAY'
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
    startDate: () => new Date().setHours(0, 0, 0, 0) - 182 * 86400000,
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

export const EVENT_ATTRS: IFieldInfo[] = [
  {
    name: '日志类型',
    value: 'actionType',
    type: 'string',
    eventType: 0,
    recommend: [
      {
        text: '页面访问',
        value: 'PAGE'
      },
      {
        text: '事件',
        value: 'EVENT'
      },
      {
        text: '页面停留',
        value: 'DURATION'
      },
      {
        text: '视区',
        value: 'VIEW'
      }
    ]
  },
  {
    name: 'pageId',
    value: 'pageId',
    type: 'string',
    eventType: 1,
    recommend: []
  },
  {
    name: 'trackId',
    value: 'trackId',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '事件名称',
    value: 'eventName',
    type: 'string',
    eventType: 1,
    recommend: []
  },

  {
    name: '停留时长',
    value: 'durationTime',
    type: 'string',
    eventType: 1,
    recommend: []
  },

  {
    name: '网络类型',
    value: 'netType',
    type: 'string',
    eventType: 0,
    recommend: []
  },

  {
    name: '用户uid',
    value: 'uid',
    type: 'string',
    eventType: 0,
    recommend: []
  },

  {
    name: '是否登录',
    value: 'isLogin',
    type: 'string',
    eventType: 0,
    recommend: []
  },

  {
    name: '用户标识utoken',
    value: 'utoken',
    type: 'string',
    eventType: 0,
    recommend: []
  },

  {
    name: '设备Id',
    value: 'deviceId',
    type: 'string',
    eventType: 0,
    recommend: []
  },

  {
    name: '页面标题',
    value: 'title',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '页面URL',
    value: 'url',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '页面PATH',
    value: 'path',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '页面HASH',
    value: 'hash',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '页面HOST',
    value: 'host',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: 'referrerURL',
    value: 'referrerUrl',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: 'referrerId',
    value: 'referrerId',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '元素Id',
    value: 'domId',
    type: 'string',
    eventType: 1,
    recommend: []
  },
  {
    name: '元素Class',
    value: 'domClass',
    type: 'string',
    eventType: 1,
    recommend: []
  },
  {
    name: '元素内容',
    value: 'domContent',
    type: 'string',
    eventType: 1,
    recommend: []
  },
  {
    name: '元素标签名',
    value: 'domTag',
    type: 'string',
    eventType: 1,
    recommend: []
  },
  {
    name: '元素链接',
    value: 'domLink',
    type: 'string',
    eventType: 1,
    recommend: []
  },
  {
    name: '浏览器',
    value: 'browser',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '浏览器版本',
    value: 'browserVersion',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '操作系统',
    value: 'os',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '操作系统版本',
    value: 'osVersion',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '内核',
    value: 'engine',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '内核版本',
    value: 'engineVersion',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '设备型号',
    value: 'deviceModel',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '平台类型',
    value: 'deviceType',
    type: 'string',
    eventType: 0,
    recommend: []
  },

  {
    name: '国家',
    value: 'country',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '省份',
    value: 'province',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '城市',
    value: 'city',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: 'IP',
    value: 'ip',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '版本',
    value: 'version',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '屏幕高',
    value: 'clientHeight',
    type: 'number',
    eventType: 0,
    recommend: []
  },
  {
    name: '屏幕宽',
    value: 'clientWidth',
    type: 'number',
    eventType: 0,
    recommend: []
  },
  {
    name: '像素比',
    value: 'radio',
    type: 'number',
    eventType: 0,
    recommend: []
  },

  {
    name: 'SDK类型',
    value: 'libType',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: 'SDK版本',
    value: 'libVersion',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '渠道',
    value: 'channel',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: 'AppId',
    value: 'appId',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '手机产品',
    value: 'product',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '系统定制商',
    value: 'deviceBrand',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '支持操作系统',
    value: 'supportedAbi',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '系统版本号',
    value: 'androidSdkInt',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '是否真机',
    value: 'isPhysicalDevice',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '自定义参数',
    value: 'custom',
    type: 'string',
    eventType: 0,
    recommend: []
  },
  {
    name: '自定义数值',
    value: 'score',
    type: 'number',
    eventType: 0,
    recommend: []
  }
];

export const permissionTypeDescription = ['', '接口', '路由', '功能'];

export const roleTypeDescription = [
  {
    id: 1,
    name: '应用角色'
  },
  {
    id: 2,
    name: '平台角色'
  }
];

export const COLOR = {
  primary: '#1890ff',
  success: '#36b389',
  warning: '#f7a500',
  danger: '#f55656',
  info: '#498df2'
};

export const PERMISSION_CODE = {
  //路由
  ROUTE_PROJECT_LIST: 'ROUTE_PROJECT_LIST',
  ROUTE_SETTING: 'ROUTE_SETTING',
  ROUTE_BOARD_LIST: 'ROUTE_BOARD_LIST',
  ROUTE_PERMISSION: 'ROUTE_PERMISSION',
  ROUTE_ROLE: 'ROUTE_ROLE',
  ROUTE_USER: 'ROUTE_USER',
  ROUTE_ANALYSE: 'ROUTE_ANALYSE',
  ROUTE_ANALYSE_EVENT: 'ROUTE_ANALYSE_EVENT',
  ROUTE_ANALYSE_FUNNEL: 'ROUTE_ANALYSE_FUNNEL',
  ROUTE_ANALYSE_PATH: 'ROUTE_ANALYSE_PATH',
  ROUTE_REPORT: 'ROUTE_REPORT',
  ROUTE_METADATA: 'ROUTE_METADATA',
  ROUTE_QUERY: 'ROUTE_QUERY',
  ROUTER_USER_TIMELINE: 'ROUTER_USER_TIMELINE',

  //接口

  ANALYSE_EVENT: 'ANALYSE_EVENT',
  ANALYSE_FUNNEL: 'ANALYSE_FUNNEL',
  ANALYSE_PATH: 'ANALYSE_PATH',

  ANALYSE_CUSTOM: 'ANALYSE_CUSTOM',

  BOARD_SEARCH: 'BOARD_SEARCH',
  BOARD_DEL: 'BOARD_DEL',
  BOARD_ADD: 'BOARD_ADD',
  BOARD_UPDATE: 'BOARD_UPDATE',
  BOARD_INFO: 'BOARD_INFO',

  METADATA_SEARCH: 'METADATA_SEARCH',
  METADATA_ADD: 'METADATA_ADD',
  METADATA_DEL: 'METADATA_DEL',
  METADATA_UPDATE: 'METADATA_UPDATE',
  METADATA_ENABLE: 'METADATA_ENABLE',
  METADATA_DISABLE: 'METADATA_DISABLE',

  PERMISSION_SEARCH: 'PERMISSION_SEARCH',
  PERMISSION_ADD: 'PERMISSION_ADD',
  PERMISSION_DEL: 'PERMISSION_DEL',
  PERMISSION_UPDATE: 'PERMISSION_UPDATE',

  PROJECT_SEARCH_ALL: 'PROJECT_SEARCH_ALL',
  PROJECT_SEARCH: 'PROJECT_SEARCH',
  PROJECT_ADD: 'PROJECT_ADD',
  PROJECT_DEL: 'PROJECT_DEL',
  PROJECT_UPDATE: 'PROJECT_UPDATE',
  PROJECT_INFO: 'PROJECT_INFO',
  PROJECT_MEMBER_ADD: 'PROJECT_MEMBER_ADD',
  PROJECT_MEMBER_DEL: 'PROJECT_MEMBER_DEL',
  PROJECT_MEMBER_UPDATE: 'PROJECT_MEMBER_UPDATE',

  REPORT_SEARCH: 'REPORT_SEARCH',
  REPORT_ADD: 'REPORT_ADD',
  REPORT_DEL: 'REPORT_DEL',
  REPORT_UPDATE: 'REPORT_UPDATE',
  REPORT_INFO: 'REPORT_INFO',

  ROLE_SEARCH: 'ROLE_SEARCH',
  ROLE_ADD: 'ROLE_ADD',
  ROLE_DEL: 'ROLE_DEL',
  ROLE_UPDATE: 'ROLE_UPDATE',

  TEAM_SEARCH: 'TEAM_SEARCH',
  TEAM_ADD: 'TEAM_ADD',
  TEAM_DEL: 'TEAM_DEL',
  TEAM_UPDATE: 'TEAM_UPDATE',
  TEAM_INFO: 'TEAM_INFO',

  USER_SEARCH: 'USER_SEARCH',
  USER_ADD: 'USER_ADD',
  USER_DEL: 'USER_DEL',
  USER_UPDATE: 'USER_UPDATE'
};
