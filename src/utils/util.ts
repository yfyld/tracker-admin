
import createHistory from 'history/createBrowserHistory';


import { matchPath } from 'react-router-dom';
import {RootState,Action} from "@/types"




 export const mapLocationIntoActions = ({ pathname, search }:any, handlers:any,state:RootState):[{action:[Action]|Action,isExist:boolean}] => (Object as any).entries(handlers)
  .map(([expectedPath, handler]) => {
    const match = matchPath(pathname, { path: expectedPath, exact: true });
    return match
      ? handler({ pathname, search, ...match.params },state)
      : [];
  })
  .reduce((a, b) => a.concat(b),[]);


export const history = createHistory()


 
export function createReducer(initialState: object, handlers: object) {
    return function reducer(state = initialState, action: Action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}



