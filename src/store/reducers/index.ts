import { combineReducers } from "redux";

import { appReducer, AppState } from "./app.reducer";
import { projectReducer, ProjectState } from "./project.reducer";
import { metadataReducer, MetadataState } from "./metadata.reducer";
import { boardReducer, BoardState } from "./board.reducer";
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