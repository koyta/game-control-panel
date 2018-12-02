import {
  CURRENT_TIMER_SET,
  SET_EDIT_TIMER,
  SET_TIMERS,
  TIMER_ADD_FAILED,
  TIMER_ADD_SUCCESS,
  TIMER_START_FAILED,
  TIMER_START_SUCCESS,
  TIMER_UPDATE_FAILED,
  TIMER_UPDATE_SUCCESS,
  TIMERS_FETCH_FAILURE,
  TIMERS_FETCH_SUCCESS,
} from '../constants/timers';

const initialState = {
  timers: [],
  isCountdown: false,
  editTimerIndex: null,
  currentTimerIndex: 0,
  error: null,
};

export default function timersReducer(state = initialState, action) {
  switch (action.type) {
    // FAILURES
    case TIMER_UPDATE_FAILED:
    case TIMER_START_FAILED:
    case TIMER_ADD_FAILED:
    case TIMERS_FETCH_FAILURE: {
      console.log(action);
      return { ...state, error: action.payload };
    }
    // SUCCESS OR ACTIONS
    case TIMERS_FETCH_SUCCESS:
    case SET_TIMERS: {
      console.log(action);
      return { ...state, timers: action.payload };
    }
    case SET_EDIT_TIMER: {
      return { ...state, editTimerIndex: action.payload };
    }
    case TIMER_UPDATE_SUCCESS: {
      return { ...state, editTimerIndex: null };
    }
    case TIMER_ADD_SUCCESS: {
      console.log(action);
      return state;
    }
    case TIMER_START_SUCCESS: {
      console.log(action);
      return { ...state, isCountdown: true, currentTimerIndex: 0 };
    }
    case CURRENT_TIMER_SET: {
      console.log(action);
      return { ...state, currentTimerIndex: action.payload };
    }
    default:
      return state;
  }
}
