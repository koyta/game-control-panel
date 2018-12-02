import {
  TIMERS_FETCH_FAILURE,
  TIMERS_FETCH_REQUEST,
  TIMERS_FETCH_SUCCESS,
  SET_TIMERS,
  SET_EDIT_TIMER,
  REMOVE_TIMER_REQUEST,
  TIMER_ADD_REQUEST,
  TIMER_UPDATE_REQUEST,
  TIMER_START,
  CURRENT_TIMER_SET,
} from '../constants/timers';

export const fetchTimers = payload => ({
  type: TIMERS_FETCH_REQUEST,
  payload,
});

export const setTimers = payload => ({
  type: SET_TIMERS,
  payload,
});

export const setEditTimer = payload => ({
  type: SET_EDIT_TIMER,
  payload,
});

export const addTimer = payload => ({
  type: TIMER_ADD_REQUEST,
  payload,
});

export const updateTimer = payload => ({
  type: TIMER_UPDATE_REQUEST,
  payload,
});

export const removeTimer = payload => {
  return {
    type: REMOVE_TIMER_REQUEST,
    payload: payload.id,
  };
};

export const timerStart = () => {
  return {
    type: TIMER_START,
    payload: undefined,
  };
};

export const currentTimerSet = index => {
  return {
    type: CURRENT_TIMER_SET,
    payload: index,
  };
};
