import { EditUserPopup } from './edit-user-popup/edit-user-popup.component';
import { User } from '../../../../../common/models/user.model';
import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { UsersFacade } from '../../services/users-facade.service';
import { UsersEventTypes } from '../../models/enums/ui-users-event-types.enum';

@Component({
  selector: 'user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(
    public dialog: MatDialog,
    private facade: UsersFacade
  ) { }

  ngOnInit() {
    this.users$ = this.facade.users$;
  }

  editUser(selectedUser: User) {

    const dialogRef = this.dialog.open(EditUserPopup, {
      width: '250px',
      data: cloneDeep(selectedUser)
    });

    dialogRef.afterClosed().subscribe((updatedUser: User) => {

      let user: Update<User> = {
        id: `${updatedUser.id}`,
        changes: updatedUser
      }

      this.facade.handleEvent(UsersEventTypes.UpdateUsers, user);
    });
  }
}
