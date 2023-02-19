import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { MaterialImportsModule } from '../shared/material-imports.module';
import { ArticlesMainComponent } from './articles-main/articles-main.component';
import { ArticlesEditComponent } from './articles-edit/articles-edit.component';


@NgModule({
    declarations: [
        ArticlesMainComponent,
        ArticlesEditComponent
    ],
    imports: [
        CommonModule,
        ArticlesRoutingModule,
        MaterialImportsModule
    ]
})
export class ArticlesModule { }
