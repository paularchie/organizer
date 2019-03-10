import { } from 'jasmine';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';

describe('LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(() => {
        component = new LoginComponent(new FormBuilder(), null, null, null);
        component.ngOnInit();
    });

    it('should create a form with 2 controls', () => {
        expect(component.form.contains('email')).toBeTruthy();
        expect(component.form.contains('password')).toBeTruthy();
    });

    it('should make the control required', () => {
        let control = component.form.get('email');

        control!.setValue('    ');

        expect(control!.errors && control!.errors!.required).toBeTruthy();
    });

    it('should not make the control required', () => {
        let control = component.form.get('password');

        control!.setValue('some email');

        expect(!control!.errors || control!.errors && !control!.errors!.required).toBe(true);
    });
})