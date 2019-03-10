import { FormControlErrorsComponent } from '../shared/modules/common-components/form/form-control/form-control-errors/form-control-errors.component';
import { MaterialModule } from '../shared/modules/material.module';
import { AfterViewInit, Compiler, Component, ComponentFactory, ComponentRef, ModuleWithComponentFactories, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';


function getInputTemplate() {
    return `
    <mat-form-field appearance="outline">
      <mat-label>{{props?.label}}</mat-label>
      <input matInput type="text" attr.formControlName={{props?.name}}/>
      </mat-form-field>
      ${getErrors()}
    `
}

function getErrors() {
    return '<mat-error>errors</mat-error>'
}

@Component({
    selector: 'runtime-content',
    template: `
        <div>
            <h3>Template</h3>
            <div>
                <textarea rows="5" [(ngModel)]="template"></textarea>
            </div>
            <button (click)="compileTemplate()">Compile</button>
            <h3>Output</h3>
            <div #container></div>
        </div>
    `
})
export class RuntimeContentComponent implements AfterViewInit {

    template: string = getInputTemplate();// '<div>\nHello, {{name}}\n</div>';

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    private componentRef: ComponentRef<{}> | null;

    constructor(
        private compiler: Compiler) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.compileTemplate();
        }, 0);
    }

    compileTemplate() {

        let metadata = {
            // selector: `runtime-component-sampe`,
            template: this.template
        };

        let factory = this.createComponentFactorySync(this.compiler, metadata, null);

        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
        this.componentRef = this.container.createComponent(factory);
    }

    private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
        const cmpClass = componentClass || class RuntimeComponent { name: string = 'Name' };
        const decoratedCmp = Component(metadata)(cmpClass);

        @NgModule({ imports: [CommonModule, MaterialModule], declarations: [decoratedCmp, FormControlErrorsComponent] })
        class RuntimeComponentModule { }

        let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);

        return module.componentFactories.find(f => f.componentType === decoratedCmp)!;
    }

}