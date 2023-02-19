import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: "home",
        loadChildren: () => import("src/app/home/home.module").then(m => m.HomeModule)
    },
    {
        path: "stores",
        loadChildren: () => import("src/app/stores/stores.module").then(m => m.StoresModule)
    },
    {
        path: "articles",
        loadChildren: () => import("src/app/articles/articles.module").then(m => m.ArticlesModule)
    },
    {
        path: "**",
        redirectTo: "home"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

