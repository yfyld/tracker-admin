import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  
} from 'axios'
import config from '@/config'
import {message} from "antd"
import { doChangeLoadingStatus } from '@/store/actions';
import {store} from "@/index"
import { localStore } from '@/utils';



const Loading = {
  loadingNum: 0,
  add(type:string): void {
    if (this.loadingNum === 0) {
      this.dispatch(true,type)
    }
    this.loadingNum++
  },
  remove(): void {
    this.loadingNum--
    if (this.loadingNum <= 0) {
      this.loadingNum = 0
      this.dispatch(false)
    }
  },
  dispatch(loading: boolean,type:string="GET") {
    store.dispatch(doChangeLoadingStatus(loading,type));
    //console.log(1)
  }
}

let curMes = ''
const errorMessage = (mes: string) => {
  if (mes === curMes) {
    return
  }
  message.error(mes,()=>{
    curMes=''
  })
  curMes = mes
}




// 实例
const instance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if((config as any).showLoading!==false){
      Loading.add(config.method.toUpperCase())
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if((response as any).config.showLoading!==false){
      Loading.remove();
    }
    
    if(response.data.code===200){
      response.data=response.data.result;
      return Promise.resolve(response)
    }else{
      errorMessage(response.data.message)
      return Promise.reject(response)
    }
  },
  (error: AxiosError) => {
    if((error as any).config.showLoading!==false){
      Loading.remove();
    }

    if (error.code === 'ECONNABORTED') {
      errorMessage('网络连接超时')
    } else {
      errorMessage('请求失败')
    }

    return Promise.reject(error)
  }
)

// 重写instance.get
const getFn = instance.get
instance.get = (
  url,
  data?: object,
  config: AxiosRequestConfig = {}
): AxiosPromise => {
  config.params = data
  return getFn(url, config)
}

export async function updateToken(token?:string){
  if(!token){
    token = await localStore.getItem("token");
  }else{
    await localStore.setItem("token",token)
  }
  instance.defaults.headers['Authorization'] = token;
  return token;
}

updateToken();
export default instance
