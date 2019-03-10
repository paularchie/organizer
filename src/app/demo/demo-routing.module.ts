import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TListComponentDemo } from './tslist.component.demo';
import { DynamicContentComponentDemo } from './dynamic-content.component.demo';
import { RuntimeContentComponentDemo } from './runtime-content.component.demo';

const routes: Routes = [
    { path: '', redirectTo: 'tlist' },
    { path: 'tlist', component: TListComponentDemo },
    { path: 'dcomponent', component: DynamicContentComponentDemo },
    { path: 'rcomponent', component: RuntimeContentComponentDemo },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
