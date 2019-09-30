import { combineReducers } from 'redux';

import { appReducer, AppState } from './app.reducer';
import { projectReducer, ProjectState } from './project.reducer';
import { metadataReducer, MetadataState } from './metadata.reducer';
import { boardReducer, BoardState } from './board.reducer';
import { reportReducer, ReportState } from './report.reducer';
import { RouterState, connectRouter } from 'connected-react-router';
import { history } from '@/utils';
export interface IStoreState {
  app: AppState;
  router: RouterState;
  project: ProjectState;
  metadata: MetadataState;
  board: BoardState;
  report: ReportState;
}

const reducers = combineReducers({
  app: appReducer,
  project: projectReducer,
  metadata: metadataReducer,
  board: boardReducer,
  report: reportReducer,
  router: connectRouter(history)
});

export default reducers;
