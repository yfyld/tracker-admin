import { createAsyncAction, createAction } from 'typesafe-actions';
import { IPageData } from '@/types';
import * as actionType from '@/constants/actionType';
import { IBoardListParam, IBoardInfo, IBoardUpdateParam, IBoardAddParam } from '@/api';

export const doGetBoardList = createAsyncAction(
  actionType.GET_BOARD_LIST_REQUEST,
  actionType.GET_BOARD_LIST_SUCCESS,
  actionType.GET_BOARD_LIST_FAILURE
)<IBoardListParam, IPageData<IBoardInfo>, Error>();

export const doGetBoardInfo = createAsyncAction(
  actionType.GET_BOARD_INFO_REQUEST,
  actionType.GET_BOARD_INFO_SUCCESS,
  actionType.GET_BOARD_INFO_FAILURE
)<number, IBoardInfo, Error>();

export const doAddBoard = createAsyncAction(
  actionType.ADD_BOARD_REQUEST,
  actionType.ADD_BOARD_SUCCESS,
  actionType.ADD_BOARD_FAILURE
)<IBoardAddParam, undefined, Error>();

export const doUpdateBoard = createAsyncAction(
  actionType.UPDATE_BOARD_REQUEST,
  actionType.UPDATE_BOARD_SUCCESS,
  actionType.UPDATE_BOARD_FAILURE
)<IBoardUpdateParam, undefined, Error>();

export const doDeleteBoard = createAsyncAction(
  actionType.DELETE_BOARD_REQUEST,
  actionType.DELETE_BOARD_SUCCESS,
  actionType.DELETE_BOARD_FAILURE
)<number, undefined, Error>();
