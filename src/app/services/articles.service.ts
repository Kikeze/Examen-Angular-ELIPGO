import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlesResult, ArticleResult } from '../shared/interfaces/article.interface';


@Injectable({
    providedIn: 'root'
})
export class ArticlesService {
    public IsNewArticle: boolean = true;

    ApiURL: String = "https://localhost:7051/Services";
    CurrentArticle: Article | null = null;

    constructor(private http: HttpClient) {
        // Do nothing
    }

    SetCurrentArticle(ArticleElement: Article | null): void {
        this.CurrentArticle = ArticleElement;

        if(this.CurrentArticle) {
            this.IsNewArticle = false;
        }
        else {
            this.IsNewArticle = true;
        }
    }

    GetArticles(StoreId: number): Observable<ArticlesResult> {
        if(StoreId >= 1) {
            return this.http.get<ArticlesResult>(`${this.ApiURL}/Articles/Stores/${StoreId}`);
        }
        else {
            return this.http.get<ArticlesResult>(`${this.ApiURL}/Articles`);
        }
    }

    InsertArticle(ArticleElement: Article): Observable<ArticleResult> {
        let ArticleParsed = {
            Id: ArticleElement.Id,
            Name: ArticleElement.Name,
            Description: ArticleElement.Description,
            Price: ArticleElement.Price,
            Total_In_Shelf: ArticleElement.Total_In_Shelf,
            Total_In_Vault: ArticleElement.Total_In_Vault,
            Store: {
                Id: ArticleElement.Store_Id,
                Name: ArticleElement.Store_Name
            }
        };

        return this.http.post<ArticleResult>(`${this.ApiURL}/Articles`, ArticleParsed);
    }

    UpdateArticle(ArticleElement: Article): Observable<ArticleResult> {
        let ArticleParsed = {
            Id: ArticleElement.Id,
            Name: ArticleElement.Name,
            Description: ArticleElement.Description,
            Price: ArticleElement.Price,
            Total_In_Shelf: ArticleElement.Total_In_Shelf,
            Total_In_Vault: ArticleElement.Total_In_Vault,
            Store: {
                Id: ArticleElement.Store_Id,
                Name: ArticleElement.Store_Name
            }
        };

        return this.http.put<ArticleResult>(`${this.ApiURL}/Articles`, ArticleParsed);
    }

    DeleteArticle(ArticleId: number): Observable<ArticleResult> {
        return this.http.delete<ArticleResult>(`${this.ApiURL}/Articles/${ArticleId}`);
    }

}
