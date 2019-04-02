import { combineReducers } from "redux";

import { appReducer, AppState } from "./app";
import { projectReducer, ProjectState } from "./project";
import { metadataReducer, MetadataState } from "./metadata";
import { boardReducer, BoardState } from "./board";
import { RouterState, connectRouter } from 'connected-react-router'
import {history} from "@/utils"
export interface RootState  {
  app: AppState;
  router:RouterState,
  project:ProjectState,
  metadata: MetadataState,
  board:BoardState
};

const reducers = combineReducers({
  app: appReducer,
  project:projectReducer,
  metadata:metadataReducer,
  board:boardReducer,
  router: connectRouter(history)
});

export default reducers;