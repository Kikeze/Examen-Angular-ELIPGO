import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, StoresResult, StoreResult } from '../shared/interfaces/store.interface';


@Injectable({
    providedIn: 'root'
})
export class StoresService {
    public IsNewStore: boolean = true;

    ApiURL: String = "https://localhost:7051/Services";
    CurrentStore: Store | null = null;

    constructor(private http: HttpClient) {
        // Do nothing
    }

    SetCurrentStore(StoreElement: Store | null): void {
        this.CurrentStore = StoreElement;

        if(this.CurrentStore) {
            this.IsNewStore = false;
        }
        else {
            this.IsNewStore = true;
        }
    }

    GetStores(): Observable<StoresResult> {
        return this.http.get<StoresResult>(`${this.ApiURL}/Stores`);
    }

    InsertStore(StoreElement: Store): Observable<StoreResult> {
        return this.http.post<StoreResult>(`${this.ApiURL}/Stores`, StoreElement);
    }

    UpdateStore(StoreElement: Store): Observable<StoreResult> {
        return this.http.put<StoreResult>(`${this.ApiURL}/Stores`, StoreElement);
    }

    DeleteStore(StoreId: number): Observable<StoreResult> {
        return this.http.delete<StoreResult>(`${this.ApiURL}/Stores/${StoreId}`);
    }

}
