import { createAsyncAction } from 'typesafe-actions';
import { PharmacyProfile } from '../../api/corona';
import { AxiosError } from 'axios';

export const GET_PHARMACY_PROFILE = 'corona/GET_PHARMACY_PROFILE';
export const GET_PHARMACY_PROFILE_SUCCESS = 'corona/GET_PHARMACY_PROFILE_SUCCESS';
export const GET_PHARMACY_PROFILE_ERROR = 'corona/GET_PHARMACY_PROFILE_ERROR';

export const getPharmacyProfileAsync = createAsyncAction(
  GET_PHARMACY_PROFILE,
  GET_PHARMACY_PROFILE_SUCCESS,
  GET_PHARMACY_PROFILE_ERROR,
)<undefined, PharmacyProfile, AxiosError>();
