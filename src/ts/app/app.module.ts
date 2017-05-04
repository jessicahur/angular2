import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import { appRouterModule } from "./app.router";
//
// import { ColorToolModule } from "./color-tool/color-tool.module";
// import { CarToolModule } from "./car-tool/car-tool.module";

import { AppComponent, PhoneValidatorDirective, SelectValidatorDirective } from "./app.component";

@NgModule( {
    imports     : [ BrowserModule,
        FormsModule, ReactiveFormsModule,
        //ColorToolModule, CarToolModule,
        //appRouterModule
    ],
    declarations: [ AppComponent, PhoneValidatorDirective, SelectValidatorDirective ],
    bootstrap   : [ AppComponent ],
} )
export class AppModule {
}
