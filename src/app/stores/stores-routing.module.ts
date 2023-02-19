import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresMainComponent } from './stores-main/stores-main.component';
import { StoresEditComponent } from './stores-edit/stores-edit.component';

const routes: Routes = [
    {
        path: "main",
        component: StoresMainComponent
    },
    {
        path: "edit",
        component: StoresEditComponent
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
export class StoresRoutingModule { }
