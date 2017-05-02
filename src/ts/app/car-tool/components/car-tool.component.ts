import { Component } from "@angular/core";

import { CarsService } from "../services/cars.service";

@Component( {
    selector : "car-tool",
    template : `
        <header>
            <h1>Car Tool</h1>
        </header>
        <router-outlet></router-outlet>
    `,
    providers: [ CarsService ],
} )
export class CarToolComponent {

}
