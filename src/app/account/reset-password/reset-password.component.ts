import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PASSWORD_ERROR_MESSAGES } from '../../shared/constants';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { required, passwordSecurity, passwordMatch } from '../../shared/util/custom-validators';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../account.component.scss', './reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  passwordErrorMessages = PASSWORD_ERROR_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', required],
      password: ['', [required, passwordSecurity.bind(this)]],
      confirmPassword: ['', [required, passwordMatch.bind(this)]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordSecurityErrors() {
    return this.password!.errors ? this.password!.errors!.passwordSecurity : [];
  }

  onSubmit() {
    const val = this.form.value;

    // double check the passwords provided match. if not, throw an error
    if (val.password !== val.confirmPassword) {
      return this.confirmPassword!.updateValueAndValidity();
    }

    // create a new user and redirect to home route is successful
    this.authService.resetPassword(val)
      .subscribe(
        // x => this.router.navigateByUrl('/'),
        res => console.log(res.error.message)
      );
  }
}

