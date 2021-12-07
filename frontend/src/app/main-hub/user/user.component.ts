import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = { name: 'Admin', picture: "/assets/userlogo.png" }
  private mode:any;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (typeof paramMap.get("mode") ==='string') {
        this.mode = paramMap.get("mode");
        this.user.name=this.mode;
      }
  });
  }

}
