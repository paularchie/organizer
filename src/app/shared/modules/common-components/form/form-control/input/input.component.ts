import { Component} from '@angular/core';
import { FormControlTypes } from '../../../../../../auth/shared/enums/form-control-types.enum';
import { FormControl } from '../form-control.class';

@Component({
  selector: FormControlTypes.Input,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends FormControl  {

  get control() {
    return this.group.get(this.props.name!);
  }
}
