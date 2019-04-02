import { all, fork } from 'redux-saga/effects';
import appSagas from './app';
import projectSagas from './project';
import metadataSagas from './metadata';


function *sagas() {
    yield all([appSagas,projectSagas,metadataSagas].map(effect => fork(effect)));
}

export default sagas;









