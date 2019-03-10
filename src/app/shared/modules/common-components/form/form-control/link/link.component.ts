import { Component, OnInit } from '@angular/core';
import { FormControlTypes } from '../../../../../../auth/shared/enums/form-control-types.enum';

@Component({
  selector: FormControlTypes.Link,
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent  implements OnInit  {

  constructor() { }

  ngOnInit() {
  }

}
