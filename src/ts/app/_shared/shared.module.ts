import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ToolHeaderComponent } from "./components/tool-header.component";

@NgModule( {
    imports     : [ CommonModule ],
    declarations: [ ToolHeaderComponent ],
    exports     : [ ToolHeaderComponent ], // so it is avai to other modules via this module
} )
export class SharedModule {
}
