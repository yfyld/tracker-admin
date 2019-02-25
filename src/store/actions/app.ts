import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST } from '@/constants';
import { createAsyncAction } from 'typesafe-actions';



export const doLogin = createAsyncAction(
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
  )<string, any, Error>();