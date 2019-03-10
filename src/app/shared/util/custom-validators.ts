import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { EMAIL_REGEX } from '../constants';
import { FormErrorTypes } from '../../auth/shared/enums/form-error-types.enum';
import { Observable, timer } from 'rxjs';
import { validatePassword } from './validate-password';
import {
    map,
    merge,
    switchMap,
} from 'rxjs/operators';


export const required = (control: AbstractControl): { [key: string]: boolean } | null =>
    !(control.value && control.value.trim()) ? { [FormErrorTypes.required]: true } : null;


export const email = (control: AbstractControl): { [key: string]: boolean } | null =>
    !(new RegExp(EMAIL_REGEX).test(control.value)) && control.value && control.value.trim() ?
        { [FormErrorTypes.email]: true } : null;

export const passwordSecurity = (control: AbstractControl): { [key: string]: string[] } | null => {
    const errors = control.value ? validatePassword(control.value) : [];
    return errors.length ? { [FormErrorTypes.passwordSecurity]: errors } : null;
}

export const passwordMatch = (passwordFieldName: string, confirmPasswordFieldName: string): AsyncValidatorFn =>
    (control: AbstractControl): Promise<{} | null> => {
        const form = control.parent;
        const password = form.get(passwordFieldName);
        const confirmPassword = form.get(confirmPasswordFieldName);

        if(!password) {
            throw new Error(`No matching control name '${password}!'`);
        }

        if(!confirmPassword) {
            throw new Error(`No matching control name '${confirmPassword}!'`);
        }

        const mergedStreams = password.valueChanges.pipe(merge(confirmPassword.valueChanges));

        return new Promise(resolve =>
            mergedStreams.subscribe(() =>
                resolve(password.value !== confirmPassword.value ? { [FormErrorTypes.passwordMatch]: true } : null)));
    }

export const duplicateField = (props: any): AsyncValidatorFn =>
    (control: AbstractControl): Observable<{} | null> => {
        const httpMethod$ = props.httpMethod({
            prop: props.field,
            value: control.value.trim()
        });

        const errorType: FormErrorTypes | null =
            props.field === 'username' ? FormErrorTypes.duplicateUsername :
                props.field === 'email' ? FormErrorTypes.duplicateEmail : null;

        return timer(400).pipe(switchMap(() => httpMethod$.pipe(
            map(duplicate => duplicate ? { [errorType!]: true } : null))
        ));
    }





