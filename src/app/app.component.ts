import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  template : `<div class="app-container"><navigation></navigation><div>`
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.getUser();
  }

  ngOnInit() {
  }
}
