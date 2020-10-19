import { ROUTE_PATH } from '@/constants';
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInterceptorManager } from 'axios';
import config from '@/config';
import { message } from 'antd';
import { doChangeLoadingStatus } from '@/store/actions';
import { store } from '@/index';
import { localStore, getCookie, setCookie } from '@/utils';
import { push } from 'connected-react-router';

export interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T>;
  delete(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise;
  head(url: string, config?: AxiosRequestConfig): AxiosPromise;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

const Loading = {
  loadingNum: 0,
  add(config: AxiosRequestConfig): void {
    if (this.loadingNum === 0) {
      this.dispatch(true, config.method.toUpperCase());
    }
    this.loadingNum++;
  },
  remove(): void {
    this.loadingNum--;
    if (this.loadingNum <= 0) {
      this.loadingNum = 0;
      this.dispatch(false);
    }
  },
  dispatch(loading: boolean, type: string = 'GET') {
    store.dispatch(doChangeLoadingStatus(loading, type));
    //console.log(1)
  }
};

let curMes = '';
const errorMessage = (mes: string) => {
  if (mes === curMes) {
    return;
  }
  message.error(mes, () => {
    curMes = '';
  });
  curMes = mes;
};

// 实例
const instance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.params && config.params.SHOW_LOADING !== false) {
      Loading.add(config);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    Loading.remove();

    if (response.data.status === 200) {
      response.data = response.data.result;
      return Promise.resolve(response);
    } else {
      errorMessage(
        response.data.message && response.data.error
          ? `${response.data.message}: ${response.data.error}`
          : response.data.message || response.data.error
      );
      if (response.data.status === 401) {
        config.signonAble
          ? store.dispatch(
              push(
                ROUTE_PATH.login + '?fromURL=' + encodeURIComponent(window.location.pathname + window.location.search)
              )
            )
          : (window.location.href = config.singelLoginURL);
      }
      return Promise.reject(response);
    }
  },
  (error: AxiosError) => {
    Loading.remove();

    if (error.code === 'ECONNABORTED') {
      errorMessage('网络连接超时');
    } else {
      errorMessage('请求失败');
    }

    return Promise.reject(error);
  }
);

// 重写instance.get
const getFn = instance.get;
instance.get = (url: string, data?: object, config: AxiosRequestConfig = {}): AxiosPromise => {
  config.params = data;
  return getFn(url, config);
};

// 重写instance.delete
const deleteFn = instance.delete;
instance.delete = (url: string, data?: object, config: AxiosRequestConfig = {}): AxiosPromise => {
  config.params = data;
  return deleteFn(url, config);
};

// export function updateToken(token?: string): string {
//   if (typeof token === 'undefined') {
//     const cookieToken = getCookie('TELESCOPE_TOKEN');
//     if (cookieToken) {
//       setCookie('TELESCOPE_TOKEN', '');
//       return updateToken(cookieToken);
//     }
//     token = localStore.getSyncItem('token');
//   } else {
//     localStore.setSyncItem('token', token);
//   }
//   instance.defaults.headers['Authorization'] = 'Bearer ' + token;
//   return token;
// }

// updateToken();
export default instance;
