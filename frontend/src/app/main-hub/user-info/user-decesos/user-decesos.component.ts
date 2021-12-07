import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Deceso } from 'src/app/models/deceso.model';
import { DecesosService } from 'src/app/services/decesos.service';

@Component({
  selector: 'app-user-decesos',
  templateUrl: './user-decesos.component.html',
  styleUrls: ['./user-decesos.component.css']
})
export class UserDecesosComponent implements OnInit {

  private decesosSub!: Subscription

  decesos:Deceso[]=[];

  mode:any

  constructor(private decesoservice:DecesosService, public dialog: MatDialog, public route: ActivatedRoute) { }



  ngOnDestroy() {
    this.decesosSub.unsubscribe()
  }

  ngOnInit(): void {



    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (typeof paramMap.get("mode") ==='string') {
        this.mode = paramMap.get("mode");
      }
  });

    this.decesoservice.getDecesos()
    this.decesosSub = this.decesoservice.getDecesoListener()
    .subscribe((decesos:Deceso[])=>{
      this.decesos=decesos;
    })
  }

  openDecesoDialog(Deceso:Deceso) {
    // let dialogRef = this.dialog.open(RegisterDecesoComponent, {
    //   height: '90%',
    //   data: Deceso
    // });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.workService.updateData()
    // })
  }

}
