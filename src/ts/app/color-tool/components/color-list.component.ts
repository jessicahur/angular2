import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Color } from "../models/colors";
import { ColorsService } from "../services/colors.service";

@Component( {
    selector : "color-list",
    template : `
        <ul>
            <li *ngFor="let color of sortedColors" >
                {{color.name | titlecase}} - {{color.hex}}
                <img (click)="deleteColor(color.id)"
                    src="https://maxcdn.icons8.com/Color/PNG/24/User_Interface/delete_sign-24.png"
                    title="Delete" width="24" height="24">
            </li>
        </ul>
        <button (click)="createNewColor()">New Color</button>
        <a routerLink="/color-tool/color-form">Create New Color</a>
    `,
} )
export class ColorListComponent {

    public lastColors: Color[]       = null;
    private theSortedColors: Color[] = null;

    constructor( private colors: ColorsService,
                 private router: Router, ) {
    }

    public get sortedColors() {

        if ( this.lastColors !== this.colors.getAll() ) {
            console.log( "sorting colors" );
            this.theSortedColors = this.colors.getAll().concat().sort();
            this.lastColors      = this.colors.getAll();
        }

        return this.theSortedColors;
    }

    public deleteColor( colorId: number ) {
        this.colors.delete( colorId );
    }

    public createNewColor() {
        // this.router.navigate(["color-tool", "color-form"]);
        this.router.navigateByUrl("/color-tool/color-form");
    }

}
