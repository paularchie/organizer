import { AbstractControl } from '@angular/forms';
import { validatePassword } from './validate-password';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

function required(control: AbstractControl): { [key: string]: boolean } | null {

    return !(control.value && control.value.trim()) ? { 'required': true } : null;
}

function passwordSecurity(control: AbstractControl): { [key: string]: string[] } | null {
    const errors = validatePassword(control.value);

    return errors.length ? { 'passwordSecurity': errors } : null;
}

function passwordMatch(): {} | null {
    let match = false;

    if (this.form) {
        match = this.password.value === this.confirmPassword.value;
    }

    return !match ? { 'passwordMatch': true } : null;
}

function duplicateField(props: any) {
    return function (control: AbstractControl): Observable<{} | null> {

        const httpMethod$ = props.httpMethod({
            prop: props.field,
            value: control.value.trim()
        });

        return timer(400).pipe(switchMap(() => httpMethod$.pipe(
            map(duplicate => duplicate ? ({ duplicate }) : null))
        ));

    };
}

export {
    required,
    passwordSecurity,
    passwordMatch,
    duplicateField
};

export default {
    required,
    passwordSecurity,
    passwordMatch,
    duplicateField
};

