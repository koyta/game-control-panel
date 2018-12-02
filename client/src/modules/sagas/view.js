import { call, put, takeEvery } from 'redux-saga/effects';
import {
  TIMER_FETCH_REQUESTED,
  TIMER_FETCH_FAILURE,
  TIMER_FETCH_SUCCESS,
} from '../constants/view';
import { API } from '../../App';

/**
 * Fetching all timers from database
 */
function* fetchTimers(action) {
  try {
    const timer = yield call(API.getTimers);
    yield put({ type: TIMER_FETCH_SUCCESS, payload: { timer } });
  } catch (error) {
    yield put({ type: TIMER_FETCH_FAILURE, payload: { error: error.message } });
  }
}

export const viewSagas = [takeEvery(TIMER_FETCH_REQUESTED, fetchTimers)];
