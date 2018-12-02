import { all } from 'redux-saga/effects';

import { viewSagas } from './view';
import { timersSagas } from './timers';

export default function* rootSaga() {
  yield all([...timersSagas]);
}
