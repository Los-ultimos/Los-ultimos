import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormanimalComponent } from './formanimal/formanimal.component';
import { FormanimalduenoComponent } from './formanimaldueno/formanimaldueno.component';
import { FormcarnetComponent } from './formcarnet/formcarnet.component';
import { FormdecesosComponent } from './formdecesos/formdecesos.component';
import { FormdocumentoComponent } from './formdocumento/formdocumento.component';
import { FormemailComponent } from './formemail/formemail.component';
import { FormfichasmedicasComponent } from './formfichasmedicas/formfichasmedicas.component';
import { FormreporteComponent } from './formreporte/formreporte.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cemzoocruz';
  sideBarOpen=false;
  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen
  }

  constructor(public dialog: MatDialog){}

  openDialog():void{
    const dialogRef=this.dialog.open(FormfichasmedicasComponent, {width:'150vh'})
  }


}
