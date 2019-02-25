
import { CACHE_TIME } from '@/constants';
import {RootState, Handler} from "@/types"
import { doLogin } from '@/store/actions';


export default {
  '/home': ({ pathname, search },state:RootState):Handler[] => {
    return [
      {
        action: doLogin.request(""),
        ttl: CACHE_TIME,
        disable: false
      },
    ]
  }
};