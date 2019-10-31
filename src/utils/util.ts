import { createBrowserHistory } from 'history';

import { matchPath } from 'react-router-dom';
import { IStoreState, IAction } from '@/types';
import * as localForage from 'localforage';

import { message } from 'antd';

export const mapLocationIntoActions = (
  { pathname, search }: any,
  handlers: any,
  state: IStoreState
): [{ action: [IAction] | IAction; disable: boolean }] =>
  (Object as any)
    .entries(handlers)
    .map(([expectedPath, handler]: [string, any]) => {
      const match = matchPath(pathname, { path: expectedPath, exact: true });
      return match ? handler({ pathname, search, ...match.params }, state) : [];
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
