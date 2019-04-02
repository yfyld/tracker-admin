import fetch from './http';
import { GetMetadataListParams } from '@/types';




export function fetchMetadataList(params: GetMetadataListParams) {
  return fetch.get('/metadata/', params)
}