import { TestBed } from '@angular/core/testing';

import { AuthFacade } from './auth-facade.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../reducers';
import { AuthEventFlowMap } from './auth-event-flow.map';
import { LoginCredentials } from '../shared/models/user.model';
import { AuthEventTypes } from './auth.models';

fdescribe('AuthFacadeService', () => {

  let facade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: {} },
        { provide: Router, useValue: { navigateByUrl: {} } }
      ]
    });

    const store = TestBed.get(Store);
    const router = TestBed.get(Router);

    facade = new AuthFacade(store, router, AuthEventFlowMap);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('Should use the AuthEventFlowMap', () => {
    expect(facade.eventFlowMap).toBe(AuthEventFlowMap);
  });
});


