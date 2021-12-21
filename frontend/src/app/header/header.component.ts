import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showing=true;
  mode:any;
  headRoute:string="";

  constructor(public route: ActivatedRoute, private r:RouteService, private authService:AuthService) { }

  ngOnInit(): void {
    this.headRoute=this.r.getRoute()
    this.showing=true;
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (typeof paramMap.get("mode") ==='string') {
  //       this.mode = paramMap.get("mode");
  //     }
  // });
  this.mode=this.authService.getUser().access

  }

  setRoute(newRoute:string){
    this.r.setRoute(newRoute);
    this.headRoute=this.r.getRoute();
  }

  toggleButton(){
    this.showing=true;
  }

  onLogout() {
    this.setRoute('main')
    this.authService.logout();
  }

}
