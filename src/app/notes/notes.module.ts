import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesContainerComponent } from './notes-container.component';
import { NotesRoutingModule } from './notes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule
  ],
  declarations: [NotesContainerComponent],
  bootstrap: [NotesContainerComponent]
})
export class NotesModule { }
