import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesMainComponent } from './articles-main/articles-main.component';
import { ArticlesEditComponent } from './articles-edit/articles-edit.component';

const routes: Routes = [
    {
        path: "main",
        component: ArticlesMainComponent
    },
    {
        path: "edit",
        component: ArticlesEditComponent
    },
    {
        path: "**",
        redirectTo: "main"
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
