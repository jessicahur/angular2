import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Color } from "../models/colors";
import { ColorsService } from "../services/colors.service";

@Component( {
    selector: "color-list",
    template: `
        <ul>
            <li color-list-item *ngFor="let theColor of sortedColors" [color]="theColor" 
            (onDeleteColor)="deleteColor($event)"></li>
        </ul>
        <button (click)="createNewColor()">New Color</button>
        <a routerLink="/color-tool/color-form">Create New Color</a>
    `,
} )
// listen to the event named onDeleteColor to execute deleteColor($event)
export class ColorListComponent implements OnInit {

    public colors: Color[] = [];
    public lastColors: Color[]       = null;
    private theSortedColors: Color[] = null;

    constructor( private colorsSvc: ColorsService,
                 private router: Router, ) {
    }

    public ngOnInit() {
        this.colorsSvc.getAll().subscribe((colors) => {
            this.colors = colors;
        });
    }

    public get sortedColors() {

        if ( this.lastColors !== this.colors ) {
            console.log( "sorting colors" );
            this.theSortedColors = this.colors.concat().sort();
            this.lastColors      = this.colors;
        }

        return this.theSortedColors;
    }

    public deleteColor( colorId: number ) {
        this.colorsSvc.delete( colorId ).subscribe((colors) => {
            this.colorsSvc.getAll().subscribe((colors) => {
                this.colors = colors;
            });
        });
    }

    public createNewColor() {
        // this.router.navigate(["color-tool", "color-form"]);
        this.router.navigateByUrl( "/color-tool/color-form" );
    }

}
