import { call, put, takeEvery } from 'redux-saga/effects';
import {
  REMOVE_TIMER_FAILURE,
  REMOVE_TIMER_REQUEST,
  REMOVE_TIMER_SUCCESS,
  TIMER_ADD_FAILED,
  TIMER_ADD_REQUEST,
  TIMER_ADD_SUCCESS,
  TIMER_START,
  TIMER_START_SUCCESS,
  TIMER_UPDATE_FAILED,
  TIMER_UPDATE_REQUEST,
  TIMER_UPDATE_SUCCESS,
  TIMERS_FETCH_FAILURE,
  TIMERS_FETCH_REQUEST,
  TIMERS_FETCH_SUCCESS,
} from '../constants/timers';

import { API } from '../../App';

/**
 * Fetching all timers from database
 */
function* fetchTimers() {
  try {
    const response = yield call(API.getTimers);
    yield put({ type: TIMERS_FETCH_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: TIMERS_FETCH_FAILURE, payload: error.message });
  }
}

function* updateTimer(action) {
  try {
    const { id, ...timer } = action.payload;
    const response = yield call(API.updateTimer, id, timer);
    yield put({ type: TIMER_UPDATE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: TIMER_UPDATE_FAILED, payload: error.message });
  }
}

function* addTimer(action) {
  try {
    const response = yield call(API.addTimer, action.payload);
    yield put({ type: TIMER_ADD_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: TIMER_ADD_FAILED, payload: error.message });
  }
}

function* removeTimer(action) {
  try {
    const response = yield call(API.deleteTimer, action.payload);
    yield put({ type: REMOVE_TIMER_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: REMOVE_TIMER_FAILURE, payload: error.message });
  }
}

function* startTimer() {
  try {
    // Tell server that he should emit to clients 'start timer' event
    yield call(API.startTimer);
    // Run action for inner redux changes (check reducer)
    yield put({ type: TIMER_START_SUCCESS, payload: undefined });
  } catch (error) {
    console.error(error);
  }
}

export const timersSagas = [
  takeEvery(TIMERS_FETCH_REQUEST, fetchTimers),
  takeEvery(TIMER_ADD_REQUEST, addTimer),
  takeEvery(TIMER_UPDATE_REQUEST, updateTimer),
  takeEvery(REMOVE_TIMER_REQUEST, removeTimer),
  takeEvery(TIMER_START, startTimer),
];
