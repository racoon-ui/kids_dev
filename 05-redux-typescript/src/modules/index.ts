import { combineReducers } from 'redux';
import counterReducer from './counter';
import { StateType } from 'typesafe-actions';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
