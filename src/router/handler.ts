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
  '/*': ({ pathname, search }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetUserInfo.request(),
        ttl: CACHE_TIME,
        disable: pathname === '/signup' || pathname === '/login' || !!state.app.userInfo.id
      }
    ];
  },
  '/project-list': ({ pathname, search }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetProjectList.request(state.project.projectListParams),
        ttl: CACHE_TIME,
        disable: false
      }
    ];
  },
  '/project/:projectId/*': ({ pathname, search, projectId }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetProjectInfo.request(projectId),
        ttl: CACHE_TIME,
        disable: state.project.projectInfo.id === Number(projectId)
      }
    ];
  },
  '/project/:projectId/metadata-list': ({ pathname, search, projectId }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetMetadataList.request({ ...state.metadata.metadataListParams, projectId: Number(projectId) }),
        ttl: CACHE_TIME,
        disable:
          !!state.metadata.metadataList.list.length && Number(projectId) === state.metadata.metadataListParams.projectId
      }
    ];
  },
  '/project/:projectId/report-list': ({ pathname, search, projectId }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetReportList.request({ ...state.report.reportListParams, projectId }),
        ttl: CACHE_TIME,
        disable: state.report.reportList.list.length && projectId === state.report.reportListParams.projectId
      }
    ];
  },
  '/project/:projectId/analyse-event': ({ pathname, search, projectId }: any, state: IStoreState): IHandler[] => {
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
  }
};

export default handlers;
