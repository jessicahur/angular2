import { Injectable } from "@angular/core";
import {Http} from "@angular/http";

import { Car } from "../models/car";
import { ModelsService } from "../../_shared/services/models.service";

@Injectable() // optional, allows defining a class that can be received via DI
export class CarsService extends ModelsService<Car> {

    // constructor() {
    //     super( [
    //         {
    //             id   : 1,
    //             make : "ford",
    //             model: "sport",
    //             color: "red",
    //             year : 2016,
    //             price: 60000,
    //         },
    //         {
    //             id   : 2,
    //             make : "toyota",
    //             model: "prius",
    //             color: "black",
    //             year : 2010,
    //             price: 30000,
    //         },
    //         {
    //             id   : 3,
    //             make : "honda",
    //             model: "accord",
    //             color: "silver",
    //             year : 2009,
    //             price: 15000,
    //         },
    //     ] );
    // }

    constructor(http: Http) {
        super(http, "http://localhost:3010/cars");
    }
}
