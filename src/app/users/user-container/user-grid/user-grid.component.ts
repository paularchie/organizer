import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';


@Component({
  selector: 'user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit, OnChanges {

  @Input() users: User[];

  @Output() editUser = new EventEmitter<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'roles', 'edit'];
  dataSource = new MatTableDataSource<User>();


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // create a shallow copy of the user data to avoid a scope issue in the paginator
    this.dataSource.data = Object.assign([], this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUserClick(user: User) {
    this.editUser.emit(user);
  }
}
