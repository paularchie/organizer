import { FormControl } from './form-control.class';
import { InputComponent } from './input/input.component';
import { LinkComponent } from './link/link.component';
import { UnknownFormControlComponent } from './unknown-form-control/unknown-form-control.component';
import { FormControlProps } from '../../../../../auth/shared/models/form-control-props.model';
import { FormControlTypes } from '../../../../../auth/shared/enums/form-control-types.enum';
import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-control',
  styleUrls: ['./form-control.component.css'],
  template: `<div #container></div>`
})
export class FormControlComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() props: FormControlProps;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  private mappings = {
    [FormControlTypes.Input]: InputComponent,
    [FormControlTypes.Link]: LinkComponent,
  };

  private componentRef: ComponentRef<{}> | null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    let componentType = this.getComponentType(this.props.type);

    // note: componentType must be declared within module.entryComponents
    let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.componentRef = this.container.createComponent(factory);

    // set component context
    let instance = <FormControl>this.componentRef.instance;
    instance.props = this.props;
    instance.group = this.group;
  }

  ngOnDestroy() {
    if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
    }
}

  getComponentType(typeName: string) {
    let type = this.mappings[typeName];
    return type || UnknownFormControlComponent;
  }
}





