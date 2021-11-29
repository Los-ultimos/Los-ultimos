import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormanimalComponent } from './formanimal/formanimal.component';

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
    const dialogRef=this.dialog.open(FormanimalComponent, {width:'250vh'})
  }


}