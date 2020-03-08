import { combineReducers } from 'redux';
import counterReducer from './counter';
import todos from './todos';
import { StateType } from 'typesafe-actions';

const rootReducer = combineReducers({
  counter: counterReducer,
  todos,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
