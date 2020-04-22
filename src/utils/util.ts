import { ROUTE_PATH } from './../constants/constant';
import { createBrowserHistory } from 'history';

import { matchPath } from 'react-router-dom';
import { IStoreState, IAction } from '@/types';
import * as localForage from 'localforage';

import { message } from 'antd';

export const getBaseURL = () => {
  const host = window.location.host;
  if (/\.\d+\.|localhost/.test(host)) {
    return 'http://127.0.0.1:7009';
  } else if (/test/.test(host)) {
    return 'http://test.qa.91jkys.com:7009';
  } else {
    return window.location.origin + '/api';
  }
};

export function getCookie(name: string) {
  const cookies = document.cookie.split('; ');
  // tslint:disable-next-line: forin
  for (const i in cookies) {
    const arr = cookies[i].split('=');
    if (name === arr[0]) {
      return unescape(arr[1]);
    }
  }
  return null;
}

export function setCookie(name: string, value: string, expires?: number, path?: string, domain?: string) {
  document.cookie =
    name +
    '=' +
    value +
    (expires ? '; expires=' + getExpires(expires) : '') +
    (path ? '; path=' + path : '') +
    (domain ? '; domain=' + domain : '');

  function getExpires(hours: number) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date.toUTCString();
  }
}

export const parseSearch = (str: string) => {
  if (typeof str != 'string') {
    return {};
  }
  const paramObj: { [prop: string]: any } = {},
    _str = str.substr(str.indexOf('?') + 1);

  const paraArr = decodeURI(_str).split('&');

  let tmp, key, value, newValue;
  for (var i = 0, len = paraArr.length; i < len; i++) {
    tmp = paraArr[i].split('=');
    key = tmp[0];
    value = tmp[1] || true;
    if (typeof value === 'string' && isNaN(Number(value)) === false) {
      value = Number(value);
    }
    if (typeof paramObj[key] === 'undefined') {
      paramObj[key] = value;
    } else {
      newValue = Array.isArray(paramObj[key]) ? paramObj[key] : [paramObj[key]];
      newValue.push(value);
      paramObj[key] = newValue;
    }
  }

  return paramObj;
};

export const mapLocationIntoActions = (
  { pathname, search }: any,
  handlers: any,
  state: IStoreState
): [{ action: [IAction] | IAction; disable: boolean }] =>
  (Object as any)
    .entries(handlers)
    .map(([expectedPath, handler]: [string, any]) => {
      const match = matchPath(pathname, { path: expectedPath, exact: true });
      return match ? handler({ pathname, search: parseSearch(search), ...match.params }, state) : [];
    })
    .reduce((a: any, b: any) => a.concat(b), []);

export const history = createBrowserHistory();

// export function createReducer(initialState: object, handlers: object) {
//     return function reducer(state = initialState, action: IAction) {
//         if (handlers.hasOwnProperty(action.type)) {
//             return handlers[action.type](state, action);
//         } else {
//             return state;
//         }
//     }
// }

export const localStore = {
  getItem: (key: string): Promise<any> => {
    return localForage.getItem(key);
  },
  setItem: (key: string, value: any): Promise<any> => {
    return localForage.setItem(key, value);
  },
  getSyncItem: (key: string): string => {
    return localStorage.getItem(key);
  },
  setSyncItem: (key: string, value: any): void => {
    return localStorage.setItem(key, value);
  }
};

export const toastformError = (err: any) => {
  const keys = Object.keys(err);
  if (!keys.length) {
    return;
  }
  try {
    message.error(err[keys[0]]['errors'][0]['message']);
  } catch (error) {
    console.log(error);
  }
};

export const getAnalysePath = (type: string, projectId: number, reportId?: number) => {
  let search = `?projectId=${projectId}`;
  if (reportId) {
    search += `&reportId=${reportId}`;
  }
  switch (type) {
    case 'EVENT':
      return ROUTE_PATH.analyseEvent + search;
    case 'FUNNEL':
      return ROUTE_PATH.analyseFunnel + search;
    case 'PATH':
      return ROUTE_PATH.analysePath + search;
    default:
      break;
  }
};

export const trimAll = (value: string): string => value.replace(/\s+/g, '');

export const getIndicatorTypeCname = (type: string) => {
  switch (type) {
    case 'PV':
      return '总次数';
    case 'UV':
      return '用户数';
    case 'APV':
      return '人均次数';
    case 'DPV':
      return '日均次数';
    default:
      return '日均用户数';
  }
};
