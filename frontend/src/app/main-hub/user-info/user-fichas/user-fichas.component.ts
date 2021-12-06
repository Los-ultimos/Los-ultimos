import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Ficha } from 'src/app/models/ficha.model';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-user-fichas',
  templateUrl: './user-fichas.component.html',
  styleUrls: ['./user-fichas.component.css']
})
export class UserFichasComponent implements OnInit, OnDestroy{

  private fichasSub!: Subscription

  fichas:Ficha[]=[];

  constructor(private fichaService:FichaService, public dialog: MatDialog) { }



  ngOnDestroy() {
    this.fichasSub.unsubscribe()
  }

  ngOnInit(): void {
    this.fichaService.getFichas()
    this.fichasSub = this.fichaService.getFichasListener()
    .subscribe((fichas:Ficha[])=>{
      this.fichas=fichas;
    })
  }

  openFichaDialog(Ficha:Ficha) {
    // let dialogRef = this.dialog.open(RegisterFichaComponent, {
    //   height: '90%',
    //   data: Ficha
    // });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.workService.updateData()
    // })
  }

}
