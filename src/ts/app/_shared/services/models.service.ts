import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Model } from "../models/model";

@Injectable() // optional, allows defining a class that can be received via DI

export abstract class ModelsService<T extends Model> {

    protected models: T[] = []; // not accessible by the world but by subclasses

    // constructor(initialModels: T[]) {
    //     this.models = initialModels.concat();
    // }

    constructor( private http: Http, private baseURL: string ) {
    }

    public getAll() {

        this.http.get(this.baseURL).map((res) => res.json()).subscribe((results) => { // because of rxjs
            console.log(results);
        });
        return this.models;
    }

    public getById( modelId: number ) {
        return this.models.find( ( model: T ) => model.id === modelId );
    }

    public append( newModel: T ) {

        newModel.id = this.models.reduce( ( maxId: number, nextModel: T ) =>
                Math.max( maxId, nextModel.id ), 0 ) + 1;

        this.models = this.models.concat( newModel );
    }

    public delete( modelId: number ) {
        const indexToSlice = this.models.findIndex( ( model: T ) => model.id === modelId );
        this.models        = [ ...this.models.slice( 0, indexToSlice ), ...this.models.slice( indexToSlice + 1 ) ];
    }
}
