
import {createBrowserHistory} from 'history';


import { matchPath } from 'react-router-dom';
import {RootState,Action} from "@/types"
import * as localForage from "localforage";



 export const mapLocationIntoActions = ({ pathname, search }:any, handlers:any,state:RootState):[{action:[Action]|Action,disable:boolean}] => (Object as any).entries(handlers)
  .map(([expectedPath, handler]:[string,any]) => {
    const match = matchPath(pathname, { path: expectedPath, exact: true });
    return match
      ? handler({ pathname, search, ...match.params },state)
      : [];
  })
  .reduce((a:any, b:any) => a.concat(b),[]);


export const history = createBrowserHistory()


 
export function createReducer(initialState: object, handlers: object) {
    return function reducer(state = initialState, action: Action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

export const localStore={
    getItem:(key:string):Promise<any>=>{
        return localForage.getItem(key)
    },
    setItem:(key:string,value:any):Promise<any>=>{
        return localForage.setItem(key,value)
    }
}

