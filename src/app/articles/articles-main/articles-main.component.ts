import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Article } from '../../shared/interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { StoresService } from '../../services/stores.service';


@Component({
  selector: 'app-articles-main',
  templateUrl: './articles-main.component.html',
  styleUrls: ['./articles-main.component.css']
})
export class ArticlesMainComponent implements OnInit, AfterViewInit {
    ColumnList: String[] = ["Id", "Name", "Description", "Price", "Total in Shelf", "Total in Vault", "Store Name", "Options"];
    dataSource = new MatTableDataSource<Article>([]);
    StoreList: Store[] = [];
    StoreFilter: Store = {Id: 0, Name: "", Address: ""};

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private ArticlesSvc: ArticlesService, private StoresSvc: StoresService, private SnackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {
        // Do nothing
    }

    ngOnInit(): void {
        this.LoadStores();
        this.LoadArticles();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
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

    FilterChange(): void {
        this.LoadArticles();
    }

    openSnackBar(Message: string) {
        this.SnackBar.open(Message, 'Close', {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 5000
        });
    }

    LoadArticles(): void {
        this.ArticlesSvc.GetArticles(this.StoreFilter.Id)
            .subscribe({
                next: (v) => {
                    if(v.Success) {
                        this.dataSource = new MatTableDataSource<Article>(v.Articles);
                        this.dataSource.paginator = this.paginator;
                    }
                    else {
                        this.openSnackBar("Record Not Found");
                        this.dataSource = new MatTableDataSource<Article>([]);
                        this.dataSource.paginator = this.paginator;
                    }
                },
                error: (e) => {
                    this.openSnackBar(e.message);
                    console.error(e);
                },
                complete: () => {
                    console.log("Consulta de Articles completada");
                }
            });
    }

    NewArticle() {
        this.ArticlesSvc.SetCurrentArticle(null);
        this.router.navigate(["articles/edit"]);
    }

    EditArticle(ArticleElement: Article) {
        this.ArticlesSvc.SetCurrentArticle(ArticleElement);
        this.router.navigate(["articles/edit"]);
    }

    DeleteArticle(ArticleElement: Article) {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            width: "25%",
            data: ArticleElement.Name
        });

        dialog.afterClosed()
            .subscribe({
                next: (v) => {
                    if( v ) {
                        this.DoDeleteAction(ArticleElement.Id);
                    }
                },
                error: (e) => {
                    console.error(e);
                },
                complete: () => {
                    console.log("Dialogo de borrado terminado");
                }
        });
    }

    DoDeleteAction(ArticleId: number): void {
        this.ArticlesSvc.DeleteArticle(ArticleId)
            .subscribe({
                next: (v) => {
                    if(v.Success) {
                        this.openSnackBar("Article Deleted");
                        this.LoadArticles();
                    }
                    else {
                        this.openSnackBar("Unable to Delete Article");
                    }
                },
                error: (e) => {
                    this.openSnackBar(e.message);
                    console.error(e);
                },
                complete: () => {
                    console.log("Delete de Articles completada");
                }
            });
    }

}
