import { all, fork } from 'redux-saga/effects';
import appSagas from './app';
import projectSagas from './project';


function *sagas() {
    yield all([appSagas,projectSagas].map(effect => fork(effect)));
}

export default sagas;









