import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContainerComponent } from './user-container/user-container.component';
import { UserGridComponent } from './user-container/user-grid/user-grid.component';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../shared/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ],
  declarations: [UserContainerComponent, UserGridComponent]
})
export class UsersModule { }
