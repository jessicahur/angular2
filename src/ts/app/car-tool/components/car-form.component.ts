import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Car } from "../models/car";
import { CarsService } from "../services/cars.service";

@Component( {
    selector : "car-form",
    template : `
        <form (ngSubmit)="addCar()">
            <!--<div>-->
                <!--<label for="new-color-input">New Color:</label>-->
                <!--<input type="text" id="new-color-input" name="newColorInput" [(ngModel)]="newColor">-->
            <!--</div>-->
            <label for="new-make-input">Make</label>
            <input type="text" id="new-make-input" name="makeInput" [(ngModel)]="newCar.make">
            
            <label for="new-model-input">Model</label>
            <input type="text" id="new-model-input" name="modelInput" [(ngModel)]="newCar.model">
            
            <label for="new-color-input">Color</label>
            <input type="text" id="new-make-input" name="colorInput" [(ngModel)]="newCar.color">
            
            <label for="new-year-input">Year</label>
            <input id="new-year-input" name="yearInput" [(ngModel)]="newCar.year">
            
            <label for="new-price-input">Price</label>
            <input type="text" id="new-price-input" name="priceInput" [(ngModel)]="newCar.price">
            <button>Add Car:</button>
            <button type="reset">Reset</button>
        </form>
`,
} )

export class CarFormComponent {
    public newCar: Car = {} as Car;

    constructor(
        private carsSvc: CarsService,
        private router: Router,
    ) {
    }

    public addCar() {
        this.carsSvc.append(this.newCar).subscribe(() => {
            this.router.navigate(["car-tool"]);
        });
    }
}
