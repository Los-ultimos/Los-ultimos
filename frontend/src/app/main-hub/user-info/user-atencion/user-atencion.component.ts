import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Atencion } from 'src/app/models/atencion.model';
import { AtencionService } from 'src/app/services/atencion.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-atencion',
  templateUrl: './user-atencion.component.html',
  styleUrls: ['./user-atencion.component.css']
})
export class UserAtencionComponent implements OnInit, OnDestroy {
  private atencionSub!: Subscription

  atenciones:Atencion[]=[];

  mode:any;

  constructor(private atencionService:AtencionService, private route: ActivatedRoute, private authService:AuthService) { }
  ngOnDestroy() {
    this.atencionSub.unsubscribe()
  }

  ngOnInit(): void {
    this.mode=this.authService.getUser().access

    this.atencionService.getAtencion()
    this.atencionSub = this.atencionService.getAtencionListener()
    .subscribe((atencion:Atencion[])=>{
      this.atenciones=atencion;
    })
  }

}
