import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { MaterialImportsModule } from '../shared/material-imports.module';
import { StoresMainComponent } from './stores-main/stores-main.component';
import { StoresEditComponent } from './stores-edit/stores-edit.component';


@NgModule({
    declarations: [
        StoresMainComponent,
        StoresEditComponent
    ],
    imports: [
        CommonModule,
        StoresRoutingModule,
        MaterialImportsModule
    ]
})
export class StoresModule { }
