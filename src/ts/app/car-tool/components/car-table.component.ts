import { Component } from "@angular/core";
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
                <tr *ngFor="let car of sortedCars">
                    <td>{{car.make | titlecase}}</td>
                    <td>{{car.model | titlecase}}</td>
                    <td>{{car.year | yo}}</td>
                    <td>{{car.color | titlecase}}</td>
                    <td>{{car.price | currency:'USD':true:'1.2-2'}}</td>
                    <td><img (click)="deleteCar(car.id)"
                        src="https://maxcdn.icons8.com/Color/PNG/24/User_Interface/delete_sign-24.png"
                        title="Delete" width="24" height="24"></td>
                </tr>
            </tbody>
        </table>
        <button (click)="addNewCar()">Add New Car</button>
`,
} )

export class CarTableComponent {

    public sortColName: string  = "";
    public sortOrder: SortOrder = SortOrder.Ascending;
    public lastCars: Car[]      = null;
    public theSortedCars: Car[] = [];

    constructor( private cars: CarsService,
                 private router: Router, ) {
    }

    public deleteCar( carId: number ) {
        this.cars.delete( carId );
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

        if ( this.lastCars !== this.cars.getAll() ) {
            this.theSortedCars = this.cars.getAll().concat().sort( ( a: Car, b: Car ) => {
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

            this.lastCars = this.cars.getAll();
        }

        return this.theSortedCars;
    }

    public addNewCar() {
        this.router.navigate( [ "car-tool", "car-form" ] );
    }
}
