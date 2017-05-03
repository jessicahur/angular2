import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { Car } from "../../models/car";

@Component( {
    selector: "[car-table-edit-item]",
    template: require( "./car-table-edit-item.component.html" ),
} )

export class CarTableEditItemComponent implements OnInit {

    public newCar: Car;

    public ngOnInit() {
        this.newCar = Object.assign( {}, this.car );
    }

    @Input()
    public car: Car;

    @Output()
    public onSaveCar = new EventEmitter<Car>();

    @Output()
    public onCancel = new EventEmitter();

    public updateCar( car: Car ) {
        this.onSaveCar.emit( car );
    }

    public cancelEdit() {
        this.onCancel.emit();
    }
}
