import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { required } from '../../shared/util/custom-validators';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../account.component.scss', './admin.component.scss']
})
export class AdminComponent implements OnInit {

  form: FormGroup;
  incorrectEmail: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userEmail: ['', [required, this.checkEmailValidity()]]
    });
  }

  get userEmail() {
    return this.form.get('userEmail');
  }

  loginAsUser() {

    const val = this.form.value;

    if (val.userEmail) {
      this.authService.loginAsUser(val.userEmail)
        .pipe(
          catchError(err => {
            this.incorrectEmailError();
            return throwError(err);
          })
        )
        .subscribe(
          user => this.router.navigateByUrl('/')
        );
    }
  }

  checkEmailValidity(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      return this.incorrectEmail ? { 'incorrectEmail': true } : null;
    };
  }

  incorrectEmailError() {
    this.incorrectEmail = true;
    this.userEmail!.updateValueAndValidity();
  }

  // reset credentials error on key press
  keyUp(event: any) {
    if (event.key !== 'Enter') {
      this.incorrectEmail = false;
      this.userEmail!.updateValueAndValidity();
    }
  }
}
