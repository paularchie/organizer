import { FormControlProps } from "../../../../../auth/shared/models/form-control-props.model";
import { FormGroup } from "@angular/forms";

export abstract class FormControl {
    props: FormControlProps;
    group: FormGroup;
  }