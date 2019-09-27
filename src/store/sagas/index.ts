import { all, fork } from 'redux-saga/effects';
import appSagas from './app.saga';
import projectSagas from './project.saga';
import metadataSagas from './metadata.saga';


function *sagas() {
    yield all([appSagas,projectSagas,metadataSagas].map(effect => fork(effect)));
}

export default sagas;









