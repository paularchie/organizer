import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { mapTo, map } from 'rxjs/operators';

@Component({
  selector: 'user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.users$ = this.userService.users$;
  }

  editUser(user: User) {
    console.log('user received', user);
  }
}
