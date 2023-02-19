import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeInfoComponent } from './home-info/home-info.component';

const routes: Routes = [
    {
        path: "**", component: HomeInfoComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
