import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { required } from '../../shared/util/custom-validators';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../account.component.scss', './login.component.scss'],
})
export class LoginComponent implements OnInit {

  incorrectCredentials: boolean;

  form: FormGroup;


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
      email: ['', [required, this.checkCredentialsValidity()]],
      password: ['', [required, this.checkCredentialsValidity()]]
    });
  }


  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const val = this.form.value;

    if (val.email && val.password) {

      this.authService.login(val.email, val.password)
        .pipe(
          catchError(err => {
            this.incorrectCredentialsError();
            return throwError(err);
          })
        )
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
          }
        );
    }
  }

  checkCredentialsValidity(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      return this.incorrectCredentials ? { 'incorrectCredentials': true } : null;
    };
  }

  // reset credentials error on key press
  keyUp(event: any) {
    if (event.key !== 'Enter') {
      this.incorrectCredentials = false;
      this.updateValidity();
    }
  }

  incorrectCredentialsError() {
    this.incorrectCredentials = true;
    this.updateValidity();
  }

  updateValidity() {



    this.email!.updateValueAndValidity();
    this.password!.updateValueAndValidity();
  }
}









