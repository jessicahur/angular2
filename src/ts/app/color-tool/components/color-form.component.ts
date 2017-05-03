import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Color } from "../models/colors";
import { ColorsService } from "../services/colors.service";

@Component({
    selector: "color-form",
    template: `
        <form (ngSubmit)="addColor()">
            <div>
                <label for="color-name-input">Color Name:</label>
                <input type="text" id="color-name-input" name="colorNameInput" [(ngModel)]="newColor.name">
            </div>
            <div>
                <label for="color-hex-input">Color Hex:</label>
                <input type="color" id="color-hex-input" name="colorHexInput" [(ngModel)]="newColor.hex">
            </div>
            <button>Add Color</button>
        </form>
    `,
})
export class ColorFormComponent {

    public newColor: Color = {
        hex: "#000000",
    } as Color;

    constructor(
        private colorsSvc: ColorsService,
        private router: Router,
    ) { }

    public addColor() {
        this.colorsSvc.append(this.newColor).subscribe(() => {
            this.router.navigate(["color-tool"]);
        });
        this.newColor = {
            hex: "#000000",
        } as Color;
    }

}
