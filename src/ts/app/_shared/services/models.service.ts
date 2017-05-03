import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import { Observable } from "rxjs";

import { Model } from "../models/model";

@Injectable() // optional, allows defining a class that can be received via DI

export abstract class ModelsService<T extends Model> {

    protected models: T[] = []; // not accessible by the world but by subclasses

    // constructor(initialModels: T[]) {
    //     this.models = initialModels.concat();
    // }

    constructor( private http: Http, private baseURL: string ) {
    }

    public getAll(): Observable<T[]> {

        return this.http.get( this.baseURL ).map( ( res ) => res.json() ); // from rxjs
    }

    public getById( modelId: number ) {
        return this.models.find( ( model: T ) => model.id === modelId );
    }

    public append( newModel: T ) {

        return this.http.post( this.baseURL, JSON.stringify( newModel ), {
            headers: new Headers( { "Content-Type": "application/json" } ),
        } ).map( ( res ) => res.json() );
    }

    public delete( modelId: number ) {

        return this.http.delete( `${this.baseURL}/${modelId}` )
            .map( ( res ) => res.json() );
    }

    public replace( data: T ) {
        console.log(data);
        return this.http.put( `${this.baseURL}/${data.id}`, JSON.stringify(data), {
            headers: new Headers( { "Content-Type": "application/json" } ),
        } ).map( ( res ) => res.json() );
    }

    // const indexToSlice = this.models.findIndex( ( model: T ) => model.id === modelId );
    // this.models        = [ ...this.models.slice( 0, indexToSlice ), ...this.models.slice( indexToSlice + 1 ) ];
}

