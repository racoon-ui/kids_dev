import { combineReducers } from 'redux';
import pharmacy from './pharmacy';

const rootReducer = combineReducers({
  pharmacy,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
