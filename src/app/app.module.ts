import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { HeadertoolbarComponent } from './headertoolbar/headertoolbar.component';
import { FormanimalComponent } from './formanimal/formanimal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormdecesosComponent } from './formdecesos/formdecesos.component';
import { FormfichasmedicasComponent } from './formfichasmedicas/formfichasmedicas.component';
import { FormanimalduenoComponent } from './formanimaldueno/formanimaldueno.component';
import { FormcarnetComponent } from './formcarnet/formcarnet.component';
import { FormemailComponent } from './formemail/formemail.component';
import { FormreporteComponent } from './formreporte/formreporte.component';
import { FormdocumentoComponent } from './formdocumento/formdocumento.component';

@NgModule({
   imports:      [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    SidenavMenuComponent,
    HeadertoolbarComponent,
    FormanimalComponent,
    FormdecesosComponent,
    FormfichasmedicasComponent,
    FormanimalduenoComponent,
    FormcarnetComponent,
    FormemailComponent,
    FormreporteComponent,
    FormdocumentoComponent,
    HelloComponent,
    LoginComponent],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
