import { RouterModule, Routes } from "@angular/router";

import { CarToolComponent } from "./components/car-tool.component";
import { CarTableComponent } from "./components/car-table.component";
import { CarFormComponent } from "./components/car-form.component";

const routes: Routes = [
          {
              path: "car-tool", component: CarToolComponent, children: [
              { path: "", component: CarTableComponent },
              { path: "car-form", component: CarFormComponent },
          ]
          },
      ]
    ;

export const carToolRouterModule = RouterModule.forChild( routes ); // does not load all services for routing
