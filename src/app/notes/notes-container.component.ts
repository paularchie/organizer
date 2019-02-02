import { Component, OnInit } from '@angular/core';
import { INoteData } from 'app/shared/models/notes.model';

@Component({
  selector: 'notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  constructor() {}

  data: INoteData[] = [
    {
      title: 'Title -1',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus magnam voluptatem libero omnis dignissimos
    nam perferendis suscipit, reiciendis ullam neque rerum laboriosam maxime quas officia quaerat distinctio. Eaque
    labore doloribus fugit quod?`
    },
    {
      title: 'Title -2',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus magnam voluptatem libero omnis dignissimos
    nam perferendis suscipit, reiciendis ullam neque rerum laboriosam maxime quas officia quaerat distinctio. Eaque
    labore doloribus fugit quod?`
    },
    {
      title: 'Title -3',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus magnam voluptatem libero omnis dignissimos
      nam perferendis suscipit, reiciendis ullam neque rerum laboriosam maxime quas officia quaerat distinctio. Eaque
      labore doloribusorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus magnam voluptatem libero omnis dignissimos
      nam perferendis suscipit, reiciendis ullam neque rerum laboriosam maxime quas officia quaerat distinctio. Eaque
      labore doloribus fugit quod?`
    },
    {
      title: 'Title -5',
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus magnam voluptatem libero omnis dignissimos
    nam perferendis suscipit, reiciendis ullam neque rerum laboriosam maxime quas officia quaerat distinctio. Eaque
    labore doloribus fugit quod?`
    }
  ];

  ngOnInit(): void {}
}
