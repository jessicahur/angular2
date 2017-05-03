import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { carToolRouterModule } from "./car-tool.router";

import { CarToolComponent } from "./components/car-tool.component";
import { CarTableComponent } from "./components/car-table.component";
import { CarFormComponent } from "./components/car-form.component";
import { CarTableItemComponent } from "./components/car-table-item/car-table-item.component";
import {CarTableEditItemComponent} from "./components/car-table-edit-item/car-table-edit-item.component";
import { CarTableHeaderColComponent } from "./components/car-table-header-col/car-table-header-col.component";

import { YoPipe } from "./pipes/yo.pipe";

@NgModule( {
    imports     : [ CommonModule, FormsModule, HttpModule, carToolRouterModule ],
    declarations: [ CarToolComponent, YoPipe, CarTableComponent, CarFormComponent,
        CarTableItemComponent, CarTableEditItemComponent,
        CarTableHeaderColComponent ],
    exports     : [ CarToolComponent ], // only exports major components so that other ngmodules can reference to this
} )

export class CarToolModule {

}
