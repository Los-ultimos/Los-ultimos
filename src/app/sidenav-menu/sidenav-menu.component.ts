import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']

})
export class SidenavMenuComponent implements OnInit {

  showFiller = false;
  constructor() { }

  ngOnInit(): void {
  }

}
