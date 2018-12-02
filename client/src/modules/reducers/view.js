import {
  TIMER_FETCH_FAILURE,
  TIMER_FETCH_REQUESTED,
  TIMER_FETCH_SUCCESS,
} from '../constants/view';

const initialState = {
  currentTimer: null,
};

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
