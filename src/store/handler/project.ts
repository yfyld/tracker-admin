
import { CACHE_TIME } from '@/constants';
import {RootState, Handler} from "@/types"
import {doGetProjectList } from '@/store/actions';


export default {
  '/project-list': ({ pathname, search }:any,state:RootState):Handler[] => {
    return [
      {
        action: doGetProjectList.request(state.project.getProjectListParams),
        ttl: CACHE_TIME,
        disable: !!state.project.projectList.list.length
      },
    ]
  }
};