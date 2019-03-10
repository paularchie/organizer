import { User } from '../../../../../../common/models/user.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


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

  ngOnChanges() {
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
