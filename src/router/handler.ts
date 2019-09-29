import { CACHE_TIME } from '@/constants';
import { RootState, Handler } from '@/types';
import { doGetUserInfo, doGetMetadataList, doGetProjectList } from '@/store/actions';

const handlers = {
  '/*': ({ pathname, search }: any, state: RootState): Handler[] => {
    return [
      {
        action: doGetUserInfo.request(),
        ttl: CACHE_TIME,
        disable: pathname === '/signup' || pathname === '/login' || !!state.app.userInfo.id
      }
    ];
  },
  '/project-list': ({ pathname, search }: any, state: RootState): Handler[] => {
    return [
      {
        action: doGetProjectList.request(state.project.projectListParams),
        ttl: CACHE_TIME,
        disable: false
      }
    ];
  },
  '/project/:projectId/metadata-list': ({ pathname, search, projectId }: any, state: RootState): Handler[] => {
    return [
      {
        action: doGetMetadataList.request(state.metadata.getMetadataListParams),
        ttl: CACHE_TIME,
        disable:
          !!state.metadata.metadataList.list.length && projectId === state.metadata.getMetadataListParams.projectId
      }
    ];
  }
};

export default handlers;
