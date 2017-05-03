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
                    <th (click)="sortByCol('make')">
                        Make
                        <span *ngIf="sortColName === 'make'">
                            <img *ngIf="sortOrder === 0"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_down-24.png"
                                title="Sort Down" width="24" height="24">
                            <img *ngIf="sortOrder === 1"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_up-24.png"
                                title="Sort Up" width="24" height="24">
                        </span>
                    </th>
                    <th (click)="sortByCol('model')">
                        Model
                        <span *ngIf="sortColName === 'model'">
                            <img *ngIf="sortOrder === 0"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_down-24.png"
                                title="Sort Down" width="24" height="24">
                            <img *ngIf="sortOrder === 1"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_up-24.png"
                                title="Sort Up" width="24" height="24">
                        </span>
                    </th>
                    <th (click)="sortByCol('year')">
                        Year
                        <span *ngIf="sortColName === 'year'">
                            <img *ngIf="sortOrder === 0"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_down-24.png"
                                title="Sort Down" width="24" height="24">
                            <img *ngIf="sortOrder === 1"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_up-24.png"
                                title="Sort Up" width="24" height="24">
                        </span>
                    </th>
                    <th (click)="sortByCol('color')">
                        Color
                        <span *ngIf="sortColName === 'color'">
                            <img *ngIf="sortOrder === 0"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_down-24.png"
                                title="Sort Down" width="24" height="24">
                            <img *ngIf="sortOrder === 1"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_up-24.png"
                                title="Sort Up" width="24" height="24">
                        </span>
                    </th>
                    <th (click)="sortByCol('price')">
                        Price
                        <span *ngIf="sortColName === 'price'">
                            <img *ngIf="sortOrder === 0"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_down-24.png"
                                title="Sort Down" width="24" height="24">
                            <img *ngIf="sortOrder === 1"
                                src="https://maxcdn.icons8.com/Android_L/PNG/24/Arrows/sort_up-24.png"
                                title="Sort Up" width="24" height="24">
                        </span>
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr car-table-item *ngFor="let theCar of sortedCars" [car]="theCar" (onDeleteCar)="deleteCar($event)"></tr>
            </tbody>
        </table>
        <button (click)="addNewCar()">Add New Car</button>
`,
} )

export class CarTableComponent {

    public cars: Car[] = [];
    public sortColName: string  = "";
    public sortOrder: SortOrder = SortOrder.Ascending;
    public lastCars: Car[]      = null;
    public theSortedCars: Car[] = [];

    constructor( private carsSvc: CarsService,
                 private router: Router ) {
    }

    public ngOnInit() {
        this.carsSvc.getAll().subscribe((cars) => {
            this.cars = cars;
        });
    }

    public deleteCar( carId: number ) {
        this.carsSvc.delete( carId ).subscribe(() => {
            this.carsSvc.getAll().subscribe((cars) => {
                this.cars = cars;
            });
        });
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
