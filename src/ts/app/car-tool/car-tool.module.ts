import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { carToolRouterModule } from "./car-tool.router";

import { CarToolComponent } from "./components/car-tool.component";
import { CarTableComponent } from "./components/car-table.component";
import { CarFormComponent } from "./components/car-form.component";

import { YoPipe } from "./pipes/yo.pipe";

@NgModule( {
    imports     : [ CommonModule, FormsModule, carToolRouterModule ],
    declarations: [ CarToolComponent, YoPipe, CarTableComponent, CarFormComponent ],
    exports     : [ CarToolComponent ], // only exports major components so that other ngmodules can reference to this
} )

export class CarToolModule {

}
