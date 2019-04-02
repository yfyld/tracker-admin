
import { CACHE_TIME } from '@/constants';
import {RootState, Handler} from "@/types"
import { doGetMetadataList } from '@/store/actions';


export default {
  '/project/:projectId/metadata-list': ({ pathname, search,projectId}:any,state:RootState):Handler[] => {
    return [
      {
        action: doGetMetadataList.request(state.metadata.getMetadataListParams),
        ttl: CACHE_TIME,
        disable: !!state.metadata.metadataList.list.length&&projectId===state.metadata.getMetadataListParams.projectId
      },
    ]
  }
};