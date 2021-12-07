import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showing=true;
   mode:any;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showing=true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (typeof paramMap.get("mode") ==='string') {
        this.mode = paramMap.get("mode");
      }
  });

  }

  toggleButton(){
    this.showing=true;
  }

}
