import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StoresService } from '../../services/stores.service';
import { Store } from '../../shared/interfaces/store.interface';


@Component({
  selector: 'app-stores-edit',
  templateUrl: './stores-edit.component.html',
  styleUrls: ['./stores-edit.component.css']
})
export class StoresEditComponent implements OnInit {
    EditAction: string = "";

    StoreModel = {
        Id: "-",
        Name: "",
        Address: ""
    };

    constructor(private StoresSvc: StoresService, private SnackBar: MatSnackBar, private router: Router) {
        // Do nothing
    }

    ngOnInit(): void {
        if(this.StoresSvc.IsNewStore) {
            this.EditAction = "Create New Store";
        }
        else {
            this.EditAction = "Edit Store";
            this.StoreModel = {
                Id: this.StoresSvc.CurrentStore!.Id.toString(),
                Name: this.StoresSvc.CurrentStore!.Name,
                Address: this.StoresSvc.CurrentStore!.Address
            };
        }
    }

    SaveStore(): void {
        if(this.StoresSvc.IsNewStore) {
            // Insert
            let NewStore: Store = {
                Id: 0,
                Name: this.StoreModel.Name,
                Address: this.StoreModel.Address
            };

            this.StoresSvc.InsertStore(NewStore)
                .subscribe({
                    next: (v) => {
                        if(v.Success) {
                            this.openSnackBar("New Store Created");
                            this.StoresSvc.SetCurrentStore(null);
                            this.router.navigate(["/stores"]);
                        }
                        else {
                            this.openSnackBar("Unable to Save Store");
                        }
                    },
                    error: (e) => {
                        this.openSnackBar(e.message);
                        console.error(e);
                    },
                    complete: () => {
                        console.log("Insert de stores completada");
                    }
                });
        }
        else {
            // Update
            let EditedStore: Store = {
                Id: this.StoresSvc.CurrentStore!.Id,
                Name: this.StoreModel.Name,
                Address: this.StoreModel.Address
            };

            this.StoresSvc.UpdateStore(EditedStore)
                .subscribe({
                    next: (v) => {
                        if(v.Success) {
                            this.openSnackBar("New Store Updated");
                            this.StoresSvc.SetCurrentStore(null);
                            this.router.navigate(["/stores"]);
                        }
                        else {
                            this.openSnackBar("Unable to Save Store");
                        }
                    },
                    error: (e) => {
                        this.openSnackBar(e.message);
                        console.error(e);
                    },
                    complete: () => {
                        console.log("Update de stores completada");
                    }
                });
        }
    }

    CancelStore(): void {
        this.StoresSvc.SetCurrentStore(null);
        this.router.navigate(["/stores"]);
    }

    openSnackBar(Message: string) {
        this.SnackBar.open(Message, 'Close', {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 5000
        });
    }


}
