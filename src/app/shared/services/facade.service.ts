import { AppState } from '../../reducers';
import { DataFlow } from '../models/data-flow.model';
import { DataFlowMap } from '../models/data-flow-map.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UIEventPayload } from '../types/ui-event-payload.type';
import { UIEvent } from '../types/ui-event.type';

@Injectable({
  providedIn: 'root'
})
export class Facade {

  private errorsSubject = new Subject<HttpErrorResponse>();
  protected errors$ = this.errorsSubject.asObservable();
  private eventFlow: DataFlow;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public eventFlowMap: DataFlowMap
  ) { }

  handleEvent(event: UIEvent, payload?: UIEventPayload) {
    this.eventFlow = this.eventFlowMap[event];
    this.triggerEventFlow(payload);
  }

  triggerEventFlow(payload?: UIEventPayload) {
    if (this.eventFlow.dataStream) {
      this.eventFlow.dataStream(payload).pipe(
        catchError(err => this.handleError(err)))
        .subscribe(res => {
          return this.dispatchActionAndRedirect(res)
        });
    } else {
      this.dispatchActionAndRedirect(payload);
    }
  }

  dispatchActionAndRedirect(payload: UIEventPayload | undefined) {
    const action = new this.eventFlow.action({ [this.eventFlow.payloadProp]: payload });
    this.store.dispatch(action);

    if (this.eventFlow.route) {
      this.router.navigateByUrl(this.eventFlow.route);
    }
  }

  handleError(err: HttpErrorResponse) {
    this.errorsSubject.next(err);
    return throwError(err);
  }
}
