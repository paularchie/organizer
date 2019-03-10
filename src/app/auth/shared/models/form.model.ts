import { AbstractControl } from "@angular/forms";
import { FormControlProps } from "./form-control-props.model";

export interface Form {
    properties: FormControlProps[],
    controls?: AbstractControl[],
    handleSubmit: (formValue: object) => void
    isFormValid?: () => boolean
}