import { AppState } from '../reducers';
import { AuthEventTypes } from '../auth/shared/enums/auth-event-types.enum';
import { AuthFacade } from '../auth/services/auth-facade.service';
import { isLoggedIn, isLoggedOut } from '../auth/state/auth.selectors';
import { NavigationItemProps } from '../shared/models/navigation-item.model';
import { UserRoles } from '../shared/constants';
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px`);

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  headerItems: NavigationItemProps[] = [
    { name: 'Home', url: '/home' },
    { name: 'Users', url: '/users', roles: [UserRoles.ADMIN] },
    { name: 'Notes', url: '/notes', authenticationState: this.isLoggedIn$ },
    { name: 'Account', url: '/account', authenticationState: this.isLoggedIn$ },
    { name: 'Admin', url: '/account/admin', roles: [UserRoles.ADMIN] },
    { name: 'Login', url: '/account/login', authenticationState: this.isLoggedOut$ },
    { name: 'Signup', url: '/account/signup', authenticationState: this.isLoggedOut$ },
    { name: 'Logout', clickHandler: this.logout.bind(this), authenticationState: this.isLoggedIn$ }
  ];

  constructor(
    zone: NgZone,
    private store: Store<AppState>,
    private facade: AuthFacade
  ) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    this.mapHeaderProps();
  }

  mapHeaderProps() {
    this.headerItems = [
      { name: 'Home', url: '/home' },
      { name: 'Users', url: '/users', authenticationState: this.isLoggedIn$, roles: [UserRoles.ADMIN] },
      { name: 'Notes', url: '/notes', authenticationState: this.isLoggedIn$ },
      // { name: 'Account', url: '/account', authenticationState: this.isLoggedIn$ },
      { name: 'Admin', url: '/account/admin', authenticationState: this.isLoggedIn$, roles: [UserRoles.ADMIN] },
      { name: 'Login', url: '/account/login', authenticationState: this.isLoggedOut$ },
      { name: 'Signup', url: '/account/signup', authenticationState: this.isLoggedOut$ },
      { name: 'Logout', clickHandler: this.logout.bind(this), authenticationState: this.isLoggedIn$ }
    ];
  }

  isSmallScreen(): boolean {
    return this.mediaMatcher.matches;
  }

  logout() {
    this.facade.handleEvent(AuthEventTypes.Logout);
  }
}
