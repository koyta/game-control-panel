import { combineReducers } from 'redux';
import control from './control';
import view from './view';

export default combineReducers({
  control,
  view,
});
