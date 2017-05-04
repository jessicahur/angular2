import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";


// import { appRouterModule } from "./app.router";
//
// import { ColorToolModule } from "./color-tool/color-tool.module";
// import { CarToolModule } from "./car-tool/car-tool.module";

import {
    AppComponent, PhoneValidatorDirective,
    SelectValidatorDirective,
    ProductSerialNumberValidatorDirective
} from "./app.component";

@NgModule( {
    imports     : [ BrowserModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        //ColorToolModule, CarToolModule,
        //appRouterModule
    ],
    declarations: [ AppComponent, PhoneValidatorDirective, SelectValidatorDirective,
        ProductSerialNumberValidatorDirective ],
    bootstrap   : [ AppComponent ],
} )
export class AppModule {
}
