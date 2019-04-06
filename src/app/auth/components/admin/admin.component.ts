import { AuthEventTypes } from '../../shared/enums/auth-event-types.enum';
import { AuthFacade } from '../../services/auth-facade.service';
import { Component, OnInit } from '@angular/core';
import { FormControlTypes } from '../../shared/enums/form-control-types.enum';
import { required } from '../../../shared/util/custom-validators';
import { FormControlProps } from '../../shared/models/form-control-props.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../auth.component.scss', './admin.component.scss']
})
export class AdminComponent implements OnInit {

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
      }
    ];
  }

  handleSubmit(value: any) {
    this.pending = true;
    this.facade.handleEvent(AuthEventTypes.LoginAsUser, value);
  }

  isFormValid(): boolean {
    return !this.pending;
  }
}
