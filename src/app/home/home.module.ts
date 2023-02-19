import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeInfoComponent } from './home-info/home-info.component';
import { MaterialImportsModule } from '../shared/material-imports.module';


@NgModule({
    declarations: [
        HomeInfoComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialImportsModule
    ]
})
export class HomeModule { }
