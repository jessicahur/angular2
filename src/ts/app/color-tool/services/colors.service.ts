import { Injectable } from "@angular/core";

import { Color } from "../models/colors";
import { ModelsService } from "../../_shared/services/models.service";

@Injectable() // optional, allows defining a class that can be received via DI
export class ColorsService extends ModelsService<Color> {

    constructor() {
        super( [
            { id: 1, name: "red", hex: "#FF0000" },
            { id: 2, name: "green", hex: "#00FF00" },
            { id: 3, name: "blue", hex: "#0000FF" },
        ] );
    }
}
