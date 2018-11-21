import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NavigationItemProps } from '../../shared/models/navigation-item.model';

@Component({
  selector: 'navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationItemComponent implements OnInit {

  @Input() props: NavigationItemProps;

  constructor() { }

  ngOnInit() {

    console.log('props', this.props);
  }

}
