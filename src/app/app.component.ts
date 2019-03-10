import { AuthEventTypes } from './auth/shared/enums/auth-event-types.enum';
import { AuthFacade } from './auth/services/auth-facade.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `<div class="app-container"><navigation></navigation><div>`
  // templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(authFacade: AuthFacade) {
    authFacade.handleEvent(AuthEventTypes.GetUserOnLoad);
  }

  ngOnInit() {
  }
}
