import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthFacade } from './auth-facade.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../reducers';
import { AuthEventFlowMap } from './auth-event-flow.map';
import { LoginCredentials } from '../shared/models/user.model';
import { AuthEventTypes } from './auth.models';
import { Facade } from './facade.service';
import { of, Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

fdescribe('FacadeService', () => {

  let facade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: {} },
        { provide: Router, useValue: { navigateByUrl: {} } },
        { provide: AuthEventFlowMap, useValue: {} }
      ]
    });

    const store = TestBed.get(Store);
    const router = TestBed.get(Router);
    const authEventFlowMap = TestBed.get(AuthEventFlowMap);

    facade = new Facade(store, router, authEventFlowMap);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should call runEventFlow', () => {
    let triggerEventFlowSpy = spyOn(facade, 'triggerEventFlow');

    facade.handleEvent(AuthEventTypes.Login);

    expect(triggerEventFlowSpy).toHaveBeenCalled();
  });

  it('should subscribe to data stream and call dispatchActionAndRedirect on success', () => {
    const dispatchActionAndRedirectSpy = spyOn(facade, 'dispatchActionAndRedirect');

    facade.eventFlow = {
      dataStream: () => of(null)
    }

    facade.triggerEventFlow({});

    expect(dispatchActionAndRedirectSpy).toHaveBeenCalled();
  });

  fit('should subscribe to data stream and catch error', () => {
    const handleErrorSpy = spyOn(facade, 'handleError');

//     const t = {
//       error: true,
//       getData: () => Observable.create(observer => {
//         //if (this.error) {
//           //  observer.error(new Error());
//        // } else {
//           observer.next('lll');
// //}
//         observer.complete();
//       })
//     }
    const s = new BehaviorSubject('null');

    const o = () => s.asObservable()





    facade.eventFlow = {
      dataStream: o
    }

    
    // o().pipe(
      //   catchError(x => throwError(console.log('error'))))
      //   .subscribe(x => console.log('dfgfg', x))
      
      facade.triggerEventFlow({});
      s.error('kk')


      o().pipe(
        catchError(err => throwError(console.log('err'), err))
      ).subscribe(x => console.log('x', x))
    // facade.eventFlow.dataStream().subscribe(x => console.log('x', x))

    // expect(handleErrorSpy).toHaveBeenCalled();
  });
});


