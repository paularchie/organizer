import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { NavigationItemProps } from '../shared/models/navigation-item.model';
import { UserRoles } from '../shared/constants';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {


  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px`);

  isLoggedIn$ = this.authService.isLoggedIn$;
  isLoggedOut$ = this.authService.isLoggedOut$;

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
    private authService: AuthService,
    private router: Router
  ) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  }

  isSmallScreen(): boolean {
    return this.mediaMatcher.matches;
  }

  logout() {
    this.authService.logout().subscribe(
      res => this.router.navigateByUrl('/'),
      error => console.log(error)
    );
  }
}
