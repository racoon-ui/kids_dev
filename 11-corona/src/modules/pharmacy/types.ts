import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { PharmacyProfile } from '../../api/corona';

export type PharmacyAction = ActionType<typeof actions>;

export type PharmacyState = {
  loading: boolean;
  error: Error | null;
  data: PharmacyProfile | null;
};
