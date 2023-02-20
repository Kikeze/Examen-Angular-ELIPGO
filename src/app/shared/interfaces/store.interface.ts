export interface Store {
    Id: number;
    Name: string;
    Address: string;
}

export interface StoresResult {
    Stores: Store[];
    Success: boolean;
    Total_Elements: number;
}

export interface StoreResult {
    Store: Store;
    Success: boolean;
    Total_Elements: number;
}

