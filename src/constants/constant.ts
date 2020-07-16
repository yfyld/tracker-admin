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
  custom: '/project/query'
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
    name: '页面Id',
    value: 'pageId',
    type: 'string',
    eventType: 1,
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
    name: '设备Id',
    value: 'utoken',
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
