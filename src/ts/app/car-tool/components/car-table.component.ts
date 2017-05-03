import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


import { Car } from "../models/car";
import { CarsService } from "../services/cars.service";

import { SortOrder } from "../enum/sort-order";

@Component( {
    selector: "car-table",
    template: `
        <table>
            <thead>
                <tr>
                    <th *ngFor="let col of cols" (click)="sortByCol(col.field)" [headerCol]="col.name" 
                    [isColSorted]="sortColName === col.field"
                    [sortOrder]="sortOrder"></th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            <ng-template ngFor let-theCar [ngForOf]="sortedCars">
                <tr *ngIf="editRow!==theCar.id" car-table-item [car]="theCar" (onDeleteCar)="deleteCar($event)"
                (click)="editRow=theCar.id"></tr>
                <tr *ngIf="editRow===theCar.id" car-table-edit-item [car]="theCar" 
                (onSaveCar)="replaceCar($event)"
                (onCancel)="editRow=-1"></tr>
            </ng-template>
            </tbody>
        </table>
        <button (click)="addNewCar()">Add New Car</button>
`,
} )

export class CarTableComponent {

    public cols                 = [
        { name: "Make", field: "make" },
        { name: "Model", field: "model" },
        { name: "Year", field: "year" },
        { name: "Color", field: "color" },
        { name: "Price", field: "price" },
    ];
    public cars: Car[]          = [];
    public sortColName: string  = "";
    public sortOrder: SortOrder = SortOrder.Ascending;
    public lastCars: Car[]      = null;
    public theSortedCars: Car[] = [];

    constructor( private carsSvc: CarsService,
                 private router: Router ) {
    }

    public ngOnInit() {
        this.carsSvc.getAll().subscribe( ( cars ) => {
            this.cars = cars;
        } );
    }

    public editRow:number;

    public replaceCar(car: Car) {
        this.carsSvc.replace(car).subscribe( () => {
            this.carsSvc.getAll().subscribe( ( cars ) => {
                this.cars = cars;
            } );
            this.editRow = -1;
        });
    }

    public deleteCar( carId: number ) {
        this.carsSvc.delete( carId ).subscribe( () => {
            this.carsSvc.getAll().subscribe( ( cars ) => {
                this.cars = cars;
            } );
        } );
    }

    public sortByCol( colName: string ) {

        if ( this.sortColName === colName ) {
            if ( this.sortOrder === SortOrder.Ascending ) {
                this.sortOrder = SortOrder.Descending;
            } else {
                this.sortOrder = SortOrder.Ascending;
            }
        } else {
            this.sortColName = colName;
            this.sortOrder   = SortOrder.Ascending;
        }

        this.lastCars = null;
    }

    public get sortedCars() {

        if ( this.lastCars !== this.cars ) {
            this.theSortedCars = this.cars.concat().sort( ( a: Car, b: Car ) => {
                const aValue = a[ this.sortColName ];
                const bValue = b[ this.sortColName ];

                if ( aValue === bValue ) {
                    return 0;
                } else {
                    if ( this.sortOrder === SortOrder.Ascending ) {
                        return aValue < bValue ? - 1 : 1;
                    } else {
                        return aValue > bValue ? - 1 : 1;
                    }
                }

            } );

            this.lastCars = this.cars;
        }

        return this.theSortedCars;
    }

    public addNewCar() {
        this.router.navigate( [ "car-tool", "car-form" ] );
    }
}
