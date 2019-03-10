import { FormComponent } from './form/form.component';
import { FormControlErrorsComponent } from './form/form-control/form-control-errors/form-control-errors.component';
import { FormControlComponent } from './form/form-control/form-control.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LinkComponent } from './form/form-control/link/link.component';
import { InputComponent } from './form/form-control/input/input.component';
import { UnknownFormControlComponent } from './form/form-control/unknown-form-control/unknown-form-control.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    FormComponent,
    FormControlComponent,
    InputComponent,
    LinkComponent,
    UnknownFormControlComponent,
    FormControlErrorsComponent,
    LinkComponent,
    InputComponent,
    UnknownFormControlComponent
  ],
  entryComponents: [
    InputComponent,
    LinkComponent,
    UnknownFormControlComponent
  ],
  exports: [
    FormComponent,
    FormControlComponent,
    InputComponent,
    LinkComponent,
    UnknownFormControlComponent,
    FormControlErrorsComponent,
    ReactiveFormsModule,
  ]
})
export class CommonComponentsModule { }
