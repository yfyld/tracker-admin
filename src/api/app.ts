import fetch from './http';
import { LoginParams } from '@/types';
import { AxiosPromise } from 'axios';



export function fetchUserInfo(params?: object) {
  return fetch.get('/user/info', params)
}
export function fetchLogin(params: LoginParams):AxiosPromise<{token:string}> {
  return fetch.post('/user/login', params)
}
export function fetchSignup(params?: object) {
  return fetch.post('/user/signup', params)
}

