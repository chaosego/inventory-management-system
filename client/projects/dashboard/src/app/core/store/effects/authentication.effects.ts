import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';

import { AuthenticationActions, loginUserSuccess, loginUserError, logoutUser, refreshTokenSuccess } from '../actions/authentication.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { IAppState } from '../state/app.state';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private _actions: Actions,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _store: Store<IAppState>,
  ) { }

  loginUser$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.LOGIN_USER),
    mergeMap(credentials => this._authenticationService.authenticateUser(credentials)
      .pipe(
        map(user => loginUserSuccess(user)),
        catchError(error => of(loginUserError(error)))
      )
    )
  ));
  
  loginUserSuccess$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.LOGIN_USER_SUCCESS),
    tap(({ payload }) => {
      localStorage.setItem('authenticatedUser', JSON.stringify(payload));
      this._router.navigate(['/dashboard', 'home']);
    })
  ), { dispatch: false });

  logoutUser$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.LOGOUT_USER),
    tap(() => {
      localStorage.removeItem('authenticatedUser');
      this._router.navigate(['/auth', 'login']);
    })
  ), { dispatch: false });

  refreshToken$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.REFRESH_TOKEN),
    withLatestFrom(this._store),
    mergeMap(([action, state]) => {
      const accessToken: string = state.authentication.authenticatedUser.accessToken;
      const refreshToken: string = state.authentication.authenticatedUser.refreshToken;
      return this._authenticationService.refreshToken(accessToken, refreshToken)
        .pipe(
          map(user => refreshTokenSuccess(user)),
          catchError(error => of(logoutUser()))
        )
    })
  ));
}

