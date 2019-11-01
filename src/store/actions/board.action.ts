import { createAsyncAction, createAction } from 'typesafe-actions';
import { IPageData, IInfoParam } from '@/types';
import * as actionType from '@/constants/actionType';
import { IBoardListParam, IBoardInfo, IBoardUpdateParam, IBoardAddParam, IReportAppendToBoard } from '@/api';

export const doGetBoardList = createAsyncAction(
  actionType.GET_BOARD_LIST_REQUEST,
  actionType.GET_BOARD_LIST_SUCCESS,
  actionType.GET_BOARD_LIST_FAILURE
)<IBoardListParam, IPageData<IBoardInfo>, Error>();

export const doGetBoardInfo = createAsyncAction(
  actionType.GET_BOARD_INFO_REQUEST,
  actionType.GET_BOARD_INFO_SUCCESS,
  actionType.GET_BOARD_INFO_FAILURE
)<IInfoParam, IBoardInfo, Error>();

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

export const doAppendReportToBoard = createAsyncAction(
  actionType.APPEND_REPORT_TO_BOARD_REQUEST,
  actionType.APPEND_REPORT_TO_BOARD_SUCCESS,
  actionType.APPEND_REPORT_TO_BOARD_FAILURE
)<IReportAppendToBoard, undefined, Error>();
