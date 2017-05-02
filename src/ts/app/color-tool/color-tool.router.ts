import { RouterModule, Routes } from "@angular/router";

import { ColorToolComponent } from "./components/color-tool.component";
import { ColorListComponent } from "./components/color-list.component";
import { ColorFormComponent } from "./components/color-form.component";

const routes: Routes = [
    {
        path: "color-tool", component: ColorToolComponent, children: [
        { path: "", component: ColorListComponent },
        { path: "color-form", component: ColorFormComponent },
    ]
    },
];

export const colorToolRouterModule = RouterModule.forChild( routes ); // does not load all services for routing
