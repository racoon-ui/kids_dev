import { createAction, createReducer, StateType } from 'typesafe-actions';

export const increase = createAction('counter/INCREASE')();
export const decrease = createAction('counter/DECREASE')();
export const increaseBy = createAction('counter/INCREASE_BY')<number>();

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const counterReducer = createReducer(initialState)
  .handleAction(increase, (state: CounterState) => ({ count: state.count + 1 }))
  .handleAction(decrease, (state: CounterState) => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state: CounterState, action: { payload: number }) => ({
    count: state.count + action.payload,
  }));

export default counterReducer;

export type Counter = StateType<typeof counterReducer>;
