import { Component } from "@angular/core";

import { Color } from "../models/colors";
import { ColorsService } from "../services/colors.service";

@Component({
    selector: "color-tool",
    template: `
        <header>
            <h1>Color Tool</h1>
        </header>
        <router-outlet></router-outlet>
        <footer>
            <small>Copyright 2017, Color Tool</small>
        </footer>
    `,
    providers: [ ColorsService ],
})
export class ColorToolComponent {}
