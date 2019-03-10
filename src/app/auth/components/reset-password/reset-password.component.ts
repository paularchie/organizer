import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { passwordMatch, passwordSecurity, required } from '../../../shared/util/custom-validators';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../auth.component.scss', './reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', required],
      password: ['', [required, passwordSecurity]],
      confirmPassword: ['', [required, passwordMatch.bind(this, 'password', 'confirmPassword')]]
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
    AuthService.resetPassword(val)
      .subscribe(
        // x => this.router.navigateByUrl('/'),
        res => console.log(res.error.message)
      );
  }
}

