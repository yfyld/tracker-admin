import { all, fork } from 'redux-saga/effects';
import appSagas from './app';



function *sagas() {
    yield all([appSagas].map(effect => fork(effect)));
}

export default sagas;









