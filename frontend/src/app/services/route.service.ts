import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  route:string="main";

  getRoute(){
    return this.route
  }

  setRoute(r:string){
    this.route=r;
  }


  constructor() { }
}
