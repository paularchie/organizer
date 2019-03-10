import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngUniversalComponent } from './ang-universal/ang-universal.component';
import { DemoRoutingModule } from './demo-routing.module';
import { TListComponent } from './tslist.component';
import { TListComponentDemo } from './tslist.component.demo';
import { DynamicContentComponent, DynamicSample1Component, DynamicSample2Component, UnknownDynamicComponent } from './dynamic-content.component';
import { DynamicContentComponentDemo } from './dynamic-content.component.demo';
import { FormsModule } from '@angular/forms';
import { RuntimeContentComponent } from './runtime-content.component';
import { RuntimeContentComponentDemo } from './runtime-content.component.demo';
import { MaterialModule } from '../shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    AngUniversalComponent,

    TListComponent,
    TListComponentDemo,

    DynamicContentComponent,
    DynamicSample1Component,
    DynamicSample2Component,
    UnknownDynamicComponent,
    DynamicContentComponentDemo,

    RuntimeContentComponent,
    RuntimeContentComponentDemo,
  ],
  entryComponents: [
    DynamicSample1Component,
    DynamicSample2Component,
    UnknownDynamicComponent
  ],
})
export class DemoModule { }
