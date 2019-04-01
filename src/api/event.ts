import fetch from './http';
import { GetEventListParams } from '@/types';




export function fetchEventList(params: GetEventListParams) {
  return fetch.get('/event/', params)
}