import { doGetBoardList, doGetBoardInfo } from './../store/actions/board.action';
import { doGetTagList } from './../store/actions/metadata.action';
import { doResetReportInfo } from './../store/actions/report.action';
import { doGetProjectInfo } from './../store/actions/project.action';
import { CACHE_TIME } from '@/constants';
import { IStoreState, IHandler } from '@/types';
import {
  doGetUserInfo,
  doGetMetadataList,
  doGetProjectList,
  doGetActiveMetadataList,
  doGetReportList
} from '@/store/actions';

const handlers = {
  '/*': ({ pathname }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetUserInfo.request(),
        ttl: CACHE_TIME,
        disable: pathname === '/signup' || pathname === '/login' || !!state.app.userInfo.id
      }
    ];
  },
  '/project-list': ({}: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetProjectList.request(state.project.projectListParams),
        ttl: CACHE_TIME,
        disable: false
      }
    ];
  },
  '/project/*': ({ search: { projectId } }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetProjectInfo.request(projectId),
        ttl: CACHE_TIME,
        disable: state.project.projectInfo.id === projectId
      },
      {
        action: doGetBoardList.request({ projectId, page: 1, pageSize: 1000 }),
        ttl: CACHE_TIME,
        disable: state.board.boardList.list.length && projectId === state.board.boardListParams.projectId
      }
    ];
  },
  '/project/metadata-list': ({ search: { projectId } }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetMetadataList.request({ ...state.metadata.metadataListParams, projectId: projectId }),
        ttl: CACHE_TIME,
        disable: !!state.metadata.metadataList.list.length && projectId === state.metadata.metadataListParams.projectId
      },
      {
        action: doGetTagList.request({ page: 1, pageSize: 1000, projectId: projectId }),
        ttl: CACHE_TIME,
        disable: state.metadata.tagList.list.length && projectId === state.metadata.tagList.list[0].projectId
      }
    ];
  },
  '/project/report-list': ({ search: { projectId } }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetReportList.request({ ...state.report.reportListParams, projectId }),
        ttl: CACHE_TIME,
        disable: state.report.reportList.list.length && projectId === state.report.reportListParams.projectId
      }
    ];
  },
  '/project/analyse-event': ({ search: { projectId } }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetActiveMetadataList.request({ ...state.metadata.activeMetadataListParams, projectId }),
        ttl: CACHE_TIME,
        disable:
          !!state.metadata.activeMetadataList.list.length &&
          projectId === state.metadata.activeMetadataListParams.projectId
      },
      {
        action: doResetReportInfo('EVENT'),
        ttl: CACHE_TIME,
        disable: false
      }
    ];
  },
  '/project/board': ({ search: { projectId, boardId } }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetBoardInfo.request({ projectId, id: boardId }),
        ttl: CACHE_TIME,
        disable: state.board.boardInfo.id === Number(boardId)
      }
    ];
  }
};

export default handlers;
