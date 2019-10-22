import { all, fork } from 'redux-saga/effects';
import appSagas from './app.saga';
import projectSagas from './project.saga';
import metadataSagas from './metadata.saga';
import reportSagas from './report.saga';

function* sagas() {
  yield all([appSagas, projectSagas, metadataSagas, reportSagas].map(effect => fork(effect)));
}

export default sagas;
