import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import customValidators from '../../shared/util/custom-validators';
import { AuthService } from '../../shared/services/auth.service';
import { PASSWORD_ERROR_MESSAGES, EMAIL_REGEX } from '../../shared/constants';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../account.component.scss', './signup.component.scss'],
})
export class SignupComponent implements OnInit {

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
      firstName: ['', customValidators.required],
      lastName: ['', customValidators.required],
      username: ['',
        [customValidators.required],
        [customValidators.duplicateField({
          httpMethod: this.authService.checkIfUserExists.bind(this.authService),
          field: 'username'
        })]
      ]
      ,
      email: ['',
        [customValidators.required,
        Validators.pattern(EMAIL_REGEX)],
        customValidators.duplicateField({
          httpMethod: this.authService.checkIfUserExists.bind(this.authService),
          field: 'email'
        })
      ],
      password: ['',
        [customValidators.required,
        customValidators.passwordSecurity.bind(this)
        ],
      ],
      confirmPassword: ['',
        [customValidators.required,
        customValidators.passwordMatch.bind(this)]]
    });
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get username() {
    return this.form.get('username');
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
    this.authService.signUp(val)
      .subscribe(
        x => this.router.navigateByUrl('/'),
        res => console.log(res.error.message)
      );
  }
}
