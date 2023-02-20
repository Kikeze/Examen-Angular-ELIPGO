import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ArticlesService } from '../../services/articles.service';
import { StoresService } from '../../services/stores.service';
import { Article } from '../../shared/interfaces/article.interface';
import { Store } from 'src/app/shared/interfaces/store.interface';


@Component({
    selector: 'app-articles-edit',
    templateUrl: './articles-edit.component.html',
    styleUrls: ['./articles-edit.component.css']
})
export class ArticlesEditComponent implements OnInit {
    StoreList: Store[] = [];
    EditAction: string = "";

    ArticleModel = {
        Id: "-",
        Name: "",
        Description: "",
        Price: 0.0,
        Total_In_Shelf: 0,
        Total_In_Vault: 0,
        Store_Id: 0,
        Store_Name: ""
    };

    constructor(private ArticlesSvc: ArticlesService, private StoresSvc: StoresService, private SnackBar: MatSnackBar, private router: Router) {
        // Do nothing
    }

    ngOnInit(): void {
        this.LoadStores();

        if(this.ArticlesSvc.IsNewArticle) {
            this.EditAction = "Create New Article";
        }
        else {
            this.EditAction = "Edit Article";
            this.ArticleModel = {
                Id: this.ArticlesSvc.CurrentArticle!.Id.toString(),
                Name: this.ArticlesSvc.CurrentArticle!.Name,
                Description: this.ArticlesSvc.CurrentArticle!.Description,
                Price: this.ArticlesSvc.CurrentArticle!.Price,
                Total_In_Shelf: this.ArticlesSvc.CurrentArticle!.Total_In_Shelf,
                Total_In_Vault: this.ArticlesSvc.CurrentArticle!.Total_In_Vault,
                Store_Id: this.ArticlesSvc.CurrentArticle!.Store_Id,
                Store_Name: this.ArticlesSvc.CurrentArticle!.Store_Name
            };
        }
    }

    LoadStores(): void {
        this.StoresSvc.GetStores()
            .subscribe({
                next: (v) => {
                    if(v.Success) {
                        this.StoreList = v.Stores;
                    }
                    else {
                        this.openSnackBar("Unable to Load Stores");
                    }
                },
                error: (e) => {
                    this.openSnackBar(e.message);
                    console.error(e);
                },
                complete: () => {
                    console.log("Consulta de Stores completada");
                }
            });
    }

    SaveArticle(): void {
        if(this.ArticleModel.Store_Id <= 0) {
            this.openSnackBar("Must Select Store");
            return;
        }

        if(this.ArticleModel.Name.trim().length <= 0) {
            this.openSnackBar("Must Specify Name");
            return;
        }

        if(this.ArticlesSvc.IsNewArticle) {
            // Insert
            let NewArticle: Article = {
                Id: 0,
                Name: this.ArticleModel.Name,
                Description: this.ArticleModel.Description,
                Price: this.ArticleModel.Price,
                Total_In_Shelf: this.ArticleModel.Total_In_Shelf,
                Total_In_Vault: this.ArticleModel.Total_In_Vault,
                Store_Id: this.ArticleModel.Store_Id,
                Store_Name: this.ArticleModel.Store_Name
            };

            this.ArticlesSvc.InsertArticle(NewArticle)
                .subscribe({
                    next: (v) => {
                        if(v.Success) {
                            this.openSnackBar("New Article Created");
                            this.ArticlesSvc.SetCurrentArticle(null);
                            this.router.navigate(["/articles"]);
                        }
                        else {
                            this.openSnackBar("Unable to Save Article");
                        }
                    },
                    error: (e) => {
                        this.openSnackBar(e.message);
                        console.error(e);
                    },
                    complete: () => {
                        console.log("Insert de Articles completada");
                    }
                });
        }
        else {
            // Update
            let EditedArticle: Article = {
                Id: this.ArticlesSvc.CurrentArticle!.Id,
                Name: this.ArticleModel.Name,
                Description: this.ArticleModel.Description,
                Price: this.ArticleModel.Price,
                Total_In_Shelf: this.ArticleModel.Total_In_Shelf,
                Total_In_Vault: this.ArticleModel.Total_In_Vault,
                Store_Id: this.ArticleModel.Store_Id,
                Store_Name: this.ArticleModel.Store_Name
            };

            this.ArticlesSvc.UpdateArticle(EditedArticle)
                .subscribe({
                    next: (v) => {
                        if(v.Success) {
                            this.openSnackBar("New Article Updated");
                            this.ArticlesSvc.SetCurrentArticle(null);
                            this.router.navigate(["/articles"]);
                        }
                        else {
                            this.openSnackBar("Unable to Save Article");
                        }
                    },
                    error: (e) => {
                        this.openSnackBar(e.message);
                        console.error(e);
                    },
                    complete: () => {
                        console.log("Update de Articles completada");
                    }
                });
        }
    }

    CancelArticle(): void {
        this.ArticlesSvc.SetCurrentArticle(null);
        this.router.navigate(["/articles"]);
    }

    openSnackBar(Message: string) {
        this.SnackBar.open(Message, 'Close', {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 5000
        });
    }

}
