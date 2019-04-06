import { AuthEventTypes } from '../../shared/enums/auth-event-types.enum';
import { AuthFacade } from '../../services/auth-facade.service';
import { Form } from '../../shared/models/form.model';
import { FormControlProps } from '../../shared/models/form-control-props.model';
import { FormControlTypes } from '../../shared/enums/form-control-types.enum';
import { required } from '../../../shared/util/custom-validators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss', './login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements Form, OnInit {

  private pending: boolean;
  credentialsError: boolean;

  constructor(private facade: AuthFacade, private toastr: ToastrService) { }

  ngOnInit() {
    this.facade.credentialsErrors$.subscribe(() => {
      this.pending = false;
      this.credentialsError = true;
      this.toastr.error('Incorrect Credentials');
    });
  }

  get properties(): FormControlProps[] {
    return [
      {
        name: 'email',
        type: FormControlTypes.Input,
        label: 'Email',
        validators: [required]
      },
      {
        name: 'password',
        type: FormControlTypes.Input,
        label: 'Password',
        validators: [required],
      },
      {
        type: FormControlTypes.Link,
        text: 'Forgot email or password?',
        className: 'forgot-password-link',
        url: '/account/forgotpassword',
      }
    ];
  }

  handleSubmit(value: object) {
    this.pending = true;
    this.facade.handleEvent(AuthEventTypes.Login, value);
  }

  isFormValid(): boolean {
    return !this.pending;
  }
}









