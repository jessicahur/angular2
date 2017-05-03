import { Component, Input, Output, EventEmitter } from "@angular/core";

import {Car} from "../../models/car";

@Component( {
    selector: "tr[car-table-item]",
    template: require( "./car-table-item.component.html" ),
    styles  : [ require( "./car-table-item.component.scss" ) ],
} )

export class CarTableItemComponent {
    @Input()
    public car: Car;

    @Output()
    public onDeleteCar = new EventEmitter<number>();

    public deleteCar(carId: number) {
        this.onDeleteCar.emit(carId);
    }
}
