export interface Article {
    Id: number;
    Name: string;
    Description: string;
    Price: number;
    Total_In_Shelf: number;
    Total_In_Vault: number;

    Store_Id: number;
    Store_Name: string;
}

export interface ArticlesResult {
    Articles: Article[];
    Success: boolean;
    Total_Elements: number;
}

export interface ArticleResult {
    Article: Article;
    Success: boolean;
    Total_Elements: number;
}

