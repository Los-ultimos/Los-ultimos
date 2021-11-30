import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-headertoolbar',
  templateUrl: './headertoolbar.component.html',
  styleUrls: ['./headertoolbar.component.css']
})
export class HeadertoolbarComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.toggleSideBarForMe.emit()
  }
}
