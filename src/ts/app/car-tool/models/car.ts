import {Model} from "../../_shared/models/model";

export interface Car extends Model {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
}
