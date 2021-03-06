import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainHubComponent } from './main-hub/main-hub.component';
import { UserComponent } from './main-hub/user/user.component';
import { UserInfoComponent } from './main-hub/user-info/user-info.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UserAnimalesComponent } from './main-hub/user-info/user-animales/user-animales.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { RegisterAnimalComponent } from './main-hub/dialogs/register-animal/register-animal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { RegisterFichaComponent } from './main-hub/dialogs/register-ficha/register-ficha.component';
import { UserFichasComponent } from './main-hub/user-info/user-fichas/user-fichas.component';
import { RegisterDecesoComponent } from './main-hub/dialogs/register-deceso/register-deceso.component';
import { UserDecesosComponent } from './main-hub/user-info/user-decesos/user-decesos.component';
import { RegisterAtencionComponent } from './main-hub/dialogs/register-atencion/register-atencion.component';
import { LoginComponent } from './login/login.component';
import { UserAtencionComponent } from './main-hub/user-info/user-atencion/user-atencion.component';

import { UserHubComponent } from './user-hub/user-hub.component';
import { UserRegisterComponent } from './user-hub/dialogs/user-register/user-register.component';
import { UserListComponent } from './user-hub/user-list/user-list.component';
import { UserEditComponent } from './user-hub/dialogs/user-edit/user-edit.component';
import { ReportesComponent } from './reportes/reportes.component';
import { DialogformComponent } from './reportes/dialogform/dialogform.component';
import {MatTableModule} from '@angular/material/table';
import {HighchartsChartModule } from 'highcharts-angular';
import {NgChartsModule} from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainHubComponent,
    UserComponent,
    UserInfoComponent,
    UserAnimalesComponent,
    RegisterAnimalComponent,
    RegisterFichaComponent,
    UserFichasComponent,
    RegisterDecesoComponent,
    UserDecesosComponent,
    RegisterAtencionComponent,
    LoginComponent,
    UserAtencionComponent,
    UserHubComponent,
    UserRegisterComponent,
    UserListComponent,
    UserEditComponent,
    ReportesComponent,
    DialogformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    HighchartsChartModule,
    NgChartsModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent],
 

})
export class AppModule { }
