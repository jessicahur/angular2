import { Component } from "@angular/core";

import { Color } from "../models/colors";
import { ColorsService } from "../services/colors.service";

@Component({
    selector: "color-tool",
    template: `
        <tool-header [header]="toolHeader"></tool-header>
        <router-outlet></router-outlet>
        <footer>
            <small>Copyright 2017, Color Tool</small>
        </footer>
    `,
    providers: [ ColorsService ],
})
export class ColorToolComponent {
    public toolHeader: string = "Color Tool";
}
