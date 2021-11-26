import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideNavRoutingModule } from "./sidenav-menu-routing.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';


@NgModule({
    declarations:[
    DashboardComponent,
    InfoComponent
  ],
    imports:[
        CommonModule,
        SideNavRoutingModule
    ]
})
export class SideNavModule{ }