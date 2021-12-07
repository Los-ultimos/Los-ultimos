import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ficha } from 'src/app/models/ficha.model';
import { FichaService } from 'src/app/services/ficha.service';
import { RegisterAtencionComponent } from '../../dialogs/register-atencion/register-atencion.component';
import { RegisterFichaComponent } from '../../dialogs/register-ficha/register-ficha.component';

@Component({
  selector: 'app-user-fichas',
  templateUrl: './user-fichas.component.html',
  styleUrls: ['./user-fichas.component.css']
})
export class UserFichasComponent implements OnInit, OnDestroy{

  private fichasSub!: Subscription

  fichas:Ficha[]=[];

  mode:any;

  constructor(private fichaService:FichaService, public dialog: MatDialog, public route: ActivatedRoute) { }



  ngOnDestroy() {
    this.fichasSub.unsubscribe()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (typeof paramMap.get("mode") ==='string') {
        this.mode = paramMap.get("mode");
      }
  });
    this.fichaService.getFichas()
    this.fichasSub = this.fichaService.getFichasListener()
    .subscribe((fichas:Ficha[])=>{
      this.fichas=fichas;
    })
  }

  openAtencionDialog() {
    let dialogRef = this.dialog.open(RegisterAtencionComponent, {
      height: '90%',
    });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.workService.updateData()
    // })
  }

  openEditarDialog(ficha:Ficha) {
    let dialogRef = this.dialog.open(RegisterFichaComponent, {
      height: '90%',
      data:ficha
    });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.workService.updateData()
    // })
  }

}
