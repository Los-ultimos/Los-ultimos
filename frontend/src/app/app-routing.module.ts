import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainHubComponent } from './main-hub/main-hub.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main-hub/:mode', component: HeaderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }