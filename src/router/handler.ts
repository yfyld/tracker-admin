import { doGetProjectInfo } from './../store/actions/project.action';
import { CACHE_TIME } from '@/constants';
import { IStoreState, IHandler } from '@/types';
import { doGetUserInfo, doGetMetadataList, doGetProjectList } from '@/store/actions';

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
        disable: !!state.project.projectInfo.id === projectId
      }
    ];
  },
  '/project/:projectId/metadata-list': ({ pathname, search, projectId }: any, state: IStoreState): IHandler[] => {
    return [
      {
        action: doGetMetadataList.request({ ...state.metadata.metadataListParams, projectId }),
        ttl: CACHE_TIME,
        disable: !!state.metadata.metadataList.list.length && projectId === state.metadata.metadataListParams.projectId
      }
    ];
  }
};

export default handlers;
