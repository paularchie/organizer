import { FormErrorCodeMap } from '../../../../../../auth/shared/enums/form-error-code-map.enum';
import { FormErrorTypes } from '../../../../../../auth/shared/enums/form-error-types.enum';
import { isArray } from '../../../../../util/is-array';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-control-errors',
  templateUrl: './form-control-errors.component.html',
  styleUrls: ['./form-control-errors.component.css']
})
export class FormControlErrorsComponent implements OnInit {

  isArray = isArray;
  errorMap = FormErrorCodeMap

  @Input() errors: FormErrorTypes | FormErrorTypes[]

  constructor() { }

  ngOnInit() { }

}
