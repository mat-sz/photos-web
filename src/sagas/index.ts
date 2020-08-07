import { fork } from 'redux-saga/effects';

import applicationSaga from './applicationSaga';
import authenticationSaga from './authenticationSaga';
import photoSaga from './photoSaga';

export default function* root() {
  yield fork(applicationSaga);
  yield fork(authenticationSaga);
  yield fork(photoSaga);
}
