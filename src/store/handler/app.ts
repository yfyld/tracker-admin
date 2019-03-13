
import { CACHE_TIME } from '@/constants';
import {RootState, Handler} from "@/types"
import { doGetUserInfo } from '@/store/actions';


export default {
  '/*': ({ pathname, search }:any,state:RootState):Handler[] => {
    return [
      {
        action: doGetUserInfo.request(),
        ttl: CACHE_TIME,
        disable: pathname==="/signup"||pathname==="/login"||!!state.app.userInfo.id
      },
    ]
  }
};