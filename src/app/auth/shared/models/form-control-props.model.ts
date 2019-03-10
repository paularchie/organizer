import { FormControlTypes } from "../enums/form-control-types.enum";
import { ValidatorFn, AsyncValidatorFn } from "@angular/forms";

interface FormControlField {
    type: FormControlTypes;
    name?: string;
    label?: string;
    validators?: ValidatorFn[],
    asyncValidators?: AsyncValidatorFn[]
}

interface FormControlLink {
    type: FormControlTypes;
    text?: string;
    className?: string;
    url?: string;
}

export interface FormControlProps extends FormControlField, FormControlLink { };
