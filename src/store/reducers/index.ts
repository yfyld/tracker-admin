import { combineReducers } from "redux";

import { appReducer, AppState } from "./app";
import { projectReducer, ProjectState } from "./project";
import { RouterState, connectRouter } from 'connected-react-router'
import {history} from "@/utils"
export interface RootState  {
  app: AppState;
  router:RouterState,
  project:ProjectState
};

const reducers = combineReducers({
  app: appReducer,
  project:projectReducer,
  router: connectRouter(history)
});

export default reducers;