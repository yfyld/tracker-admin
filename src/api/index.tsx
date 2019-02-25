import fetch from './http';



export function fetchUserInfo(params?: object) {
  return fetch.get('/user/info', params)
}
export function fetchLogin(params?: object) {
  return fetch.post('/user/login', params)
}
export function fetchSignup(params?: object) {
  return fetch.post('/user/signup', params)
}

