import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesContainerComponent } from './notes-container.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule
  ],
  declarations: [NotesContainerComponent, NotesComponent],
  bootstrap: [NotesContainerComponent]
})
export class NotesModule { }
