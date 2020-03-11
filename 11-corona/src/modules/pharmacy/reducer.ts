import { createReducer } from 'typesafe-actions';
import { PharmacyState, PharmacyAction } from './types';
import { GET_PHARMACY_PROFILE, GET_PHARMACY_PROFILE_SUCCESS, GET_PHARMACY_PROFILE_ERROR } from './actions';

const initialState: PharmacyState = {
  loading: false,
  error: null,
  data: null,
};

const pharmacy = createReducer<PharmacyState, PharmacyAction>(initialState, {
  [GET_PHARMACY_PROFILE]: state => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }),
  [GET_PHARMACY_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [GET_PHARMACY_PROFILE_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }),
});

export default pharmacy;
