import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { colorToolRouterModule } from "./color-tool.router";
import { SharedModule} from "../_shared/shared.module";

import { ColorToolComponent } from "./components/color-tool.component";
import { ColorListComponent } from "./components/color-list.component";
import { ColorFormComponent } from "./components/color-form.component";

@NgModule( {
    imports     : [ CommonModule, FormsModule, colorToolRouterModule, HttpModule, SharedModule ], // for config
    declarations: [ ColorToolComponent, ColorListComponent, ColorFormComponent ],
    exports     : [ ColorToolComponent ], // only exports major components so that other ngmodules can reference to this
} )

export class ColorToolModule {

}
