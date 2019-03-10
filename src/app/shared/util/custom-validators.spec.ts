import customValidators, { required } from "./custom-validators";
import { AbstractControl, FormBuilder } from "@angular/forms";
import { MatExpansionPanelContent } from "@angular/material";
import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "../../auth/components/login/login.component";


describe('Custom Validators', () => {

    const fb = new FormBuilder();
    const form = fb.group({ control: [''] });
    const control = form.get('control') as AbstractControl;


    const fixture = TestBed.createComponent(LoginComponent);
    // const app = fixture.debugElement.componentInstance;

    it(`should return 'required' error`, () => {
        const error = required(control);
        expect(error).toEqual({ required: true });
    });

    it(`should return 'required' error`, () => {
        control.setValue('     ');
        const error = required(control);
        expect(control.value).toBeTruthy;
    });

    it(`shouldn't return 'required' error`, () => {
        control.setValue('some value');
        const error = required(control);
        expect(error).toBeNull;
    });

    it(`shouldn't return 'required' error`, () => {
        control.setValue('      some value');
        const error = required(control);
        expect(error).toBeNull;
    });
})