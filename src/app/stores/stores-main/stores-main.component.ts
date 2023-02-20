import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '../../shared/interfaces/store.interface';
import { StoresService } from '../../services/stores.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-stores-main',
  templateUrl: './stores-main.component.html',
  styleUrls: ['./stores-main.component.css']
})
export class StoresMainComponent implements OnInit, AfterViewInit {
    ColumnList: String[] = ["Id", "Name", "Address", "Options"];
    dataSource = new MatTableDataSource<Store>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private StoresSvc: StoresService, private SnackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {
        // Do nothing
    }

    ngOnInit(): void {
        this.LoadStores();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    openSnackBar(Message: string) {
        this.SnackBar.open(Message, 'Close', {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 5000
        });
    }

    LoadStores(): void {
        this.StoresSvc.GetStores()
            .subscribe({
                next: (v) => {
                    if(v.Success) {
                        this.dataSource = new MatTableDataSource<Store>(v.Stores);
                        this.dataSource.paginator = this.paginator;
                    }
                    else {
                        this.openSnackBar("Record Not Found");
                        this.dataSource = new MatTableDataSource<Store>([]);
                        this.dataSource.paginator = this.paginator;
                    }
                },
                error: (e) => {
                    this.openSnackBar(e.message);
                    console.error(e);
                },
                complete: () => {
                    console.log("Consulta de stores completada");
                }
            });
    }

    NewStore() {
        this.StoresSvc.SetCurrentStore(null);
        this.router.navigate(["stores/edit"]);
    }

    EditStore(StoreElement: Store) {
        this.StoresSvc.SetCurrentStore(StoreElement);
        this.router.navigate(["stores/edit"]);
    }

    DeleteStore(StoreElement: Store) {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            width: "25%",
            data: StoreElement.Name
        });

        dialog.afterClosed()
            .subscribe({
                next: (v) => {
                    if( v ) {
                        this.DoDeleteAction(StoreElement.Id);
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

    DoDeleteAction(StoreId: number): void {
        this.StoresSvc.DeleteStore(StoreId)
            .subscribe({
                next: (v) => {
                    if(v.Success) {
                        this.openSnackBar("Store Deleted");
                        this.LoadStores();
                    }
                    else {
                        this.openSnackBar("Unable to Delete Store");
                    }
                },
                error: (e) => {
                    this.openSnackBar(e.message);
                    console.error(e);
                },
                complete: () => {
                    console.log("Delete de stores completada");
                }
            });
    }

}
