import { AuthEventTypes } from '../../shared/enums/auth-event-types.enum';
import { AuthFacade } from '../../services/auth-facade.service';
import { AuthService } from '../../../shared/services/auth.service';
import { duplicateField, email, passwordMatch, passwordSecurity, required } from '../../../shared/util/custom-validators';
import { Form } from '../../shared/models/form.model';
import { FormControlProps } from '../../shared/models/form-control-props.model';
import { FormControlTypes } from '../../shared/enums/form-control-types.enum';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss', './signup.component.scss'],
})
export class SignupComponent implements Form, AfterViewInit {

  @ViewChild('FormComponent') FormComponent;

  constructor(private facade: AuthFacade) { }

  ngAfterViewInit() {
    this.password.valueChanges.subscribe(() => this.confirmPassword.updateValueAndValidity())
  }

  get password() {
    return this.FormComponent.form.get('password');
  }

  get confirmPassword() {
    return this.FormComponent.form.get('confirmPassword');
  }

  get properties(): FormControlProps[] {
    return [
      {
        name: 'firstName',
        type: FormControlTypes.Input,
        label: 'First Name',
        validators: [required]
      },
      {
        name: 'lastName',
        type: FormControlTypes.Input,
        label: 'Last Name',
        validators: [required]
      },
      {
        name: 'username',
        type: FormControlTypes.Input,
        label: 'Username',
        validators: [required],
        asyncValidators: [duplicateField({
          httpMethod: AuthService.checkIfUserExists,
          field: 'username'
        })]
      },
      {
        name: 'email',
        type: FormControlTypes.Input,
        label: 'Email',
        validators: [required, email],
        asyncValidators: [duplicateField({
          httpMethod: AuthService.checkIfUserExists,
          field: 'email'
        })]
      },
      {
        name: 'password',
        type: FormControlTypes.Input,
        label: 'Password',
        validators: [required, passwordSecurity]
      },
      {
        name: 'confirmPassword',
        type: FormControlTypes.Input,
        label: 'Password',
        validators: [required],
        asyncValidators: [passwordMatch('password', 'confirmPassword')]
      }
    ]
  }

  handleSubmit(value: any) {
    this.facade.handleEvent(AuthEventTypes.Signup, value);
  }
}
