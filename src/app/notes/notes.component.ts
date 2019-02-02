import { Component, OnInit, Input } from '@angular/core';
import { INoteData } from 'app/shared/models/notes.model';

@Component({
  selector: 'notes-item',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() data: INoteData;
  constructor() {}

  ngOnInit() {}
}
