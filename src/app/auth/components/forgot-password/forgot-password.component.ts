import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn
  } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { required } from '../../../shared/util/custom-validators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../auth.component.scss', './forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  incorrectPassword: boolean;
  showResetPasswordForm: boolean;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [required, this.checkEmailValidity()]],
    });
  }


  get email() {
    return this.form.get('email');
  }


  onSubmit() {
    const val = this.form.value;

    if (val.email) {

      AuthService.forgotPassword(val.email)
        .pipe(
          catchError(err => {
            this.incorrectEmailError();
            return throwError(err);
          })
        )
        .subscribe(
          () => {
            this.router.navigateByUrl('/auth/resetpassword');
          }
        );
    }
  }

  checkEmailValidity(): ValidatorFn {
    return (): { [key: string]: any } | null => {
      return this.incorrectPassword ? { 'incorrectEmail': true } : null;
    };
  }

  incorrectEmailError() {
    this.incorrectPassword = true;
    this.email!.updateValueAndValidity();
  }

  // reset incorrect password error on key press
  keyUp(event: any) {
    if (event.key !== 'Enter') {
      this.incorrectPassword = false;
      this.email!.updateValueAndValidity();
    }
  }
}
