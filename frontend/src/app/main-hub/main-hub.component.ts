import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterAnimalComponent } from './dialogs/register-animal/register-animal.component';

@Component({
  selector: 'app-main-hub',
  templateUrl: './main-hub.component.html',
  styleUrls: ['./main-hub.component.css']
})
export class MainHubComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    let dialogRef = this.dialog.open(RegisterAnimalComponent, {
      height: '90%'
    });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.workService.updateData()
    // })
  }

}
