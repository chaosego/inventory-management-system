import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAccountState } from '../state/account.state';

export const selectAccountState = createFeatureSelector<IAccountState>("account");

export const selectAccountDetails = createSelector(
  selectAccountState,
  (state: IAccountState) => state.details  
);

export const selectAccountStatus = createSelector(
  selectAccountState,
  (state: IAccountState) => state.status
);

export const selectAccountProfile = createSelector(
  selectAccountState,
  (state: IAccountState) => state.profile
);
