import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControlProps } from '../../../../auth/shared/models/form-control-props.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  @Input() props: FormControlProps[];
  @Input() isFormValid: () => void;

  @Output() submitt = new EventEmitter();

  form: FormGroup;
  properties: FormControlProps[];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // TODO: refactor
    this.properties = [...this.props];
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({});

    for (let prop of this.properties) {
      if (prop.name) {
        const control = this.createControl(prop.name);
        this.setValidators(control, prop);
      }
    }
  }

  createControl(controlName: string): AbstractControl {
    const control = new FormControl();
    this.form.setControl(controlName, control);

    return control;
  }

  setValidators(control: AbstractControl, prop) {
    if (prop.validators) {
      control.setValidators(prop.validators);
    }

    if (prop.asyncValidators) {
      control.setAsyncValidators(prop.asyncValidators);
    }
  }

  onSubmit() {
    this.submitt.emit(this.form.value);
  }
}









