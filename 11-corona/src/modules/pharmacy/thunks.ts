import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { PharmacyAction } from './types';
import { getPharmacy } from '../../api/corona';
import { getPharmacyProfileAsync } from './actions';

export function getPharmacyProfileThunk(address: string): ThunkAction<void, RootState, null, PharmacyAction> {
  return async dispatch => {
    const { request, success, failure } = getPharmacyProfileAsync;
    dispatch(request());
    try {
      const data = await getPharmacy(address);
      dispatch(success(data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}
