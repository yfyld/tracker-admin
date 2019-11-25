import { all, fork } from 'redux-saga/effects';
import appSagas from './app.saga';
import projectSagas from './project.saga';
import metadataSagas from './metadata.saga';
import reportSagas from './report.saga';
import boardSagas from './board.saga';
import teamSagas from './team.saga';
function* sagas() {
  yield all([appSagas, projectSagas, metadataSagas, reportSagas, boardSagas, teamSagas].map(effect => fork(effect)));
}

export default sagas;
