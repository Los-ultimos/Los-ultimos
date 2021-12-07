import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Atencion } from 'src/app/models/atencion.model';
import { AtencionService } from 'src/app/services/atencion.service';

@Component({
  selector: 'app-user-atencion',
  templateUrl: './user-atencion.component.html',
  styleUrls: ['./user-atencion.component.css']
})
export class UserAtencionComponent implements OnInit, OnDestroy {
  private atencionSub!: Subscription

  atenciones:Atencion[]=[];

  mode:any;

  constructor(private atencionService:AtencionService, private route: ActivatedRoute) { }
  ngOnDestroy() {
    this.atencionSub.unsubscribe()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (typeof paramMap.get("mode") ==='string') {
        this.mode = paramMap.get("mode");
      }
  });
    this.atencionService.getAtencion()
    this.atencionSub = this.atencionService.getAtencionListener()
    .subscribe((atencion:Atencion[])=>{
      this.atenciones=atencion;
    })
  }

}
