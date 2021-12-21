import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/user-hub/auth-data.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  fetchedUser:AuthData={name:"",email:"",password:"",access:""}

  user = { name: 'Admin', picture: "/assets/userlogo.png" }
  private mode:any;

  constructor(public route: ActivatedRoute, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchedUser=this.authService.getUser()
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (typeof paramMap.get("mode") ==='string') {
        this.mode = paramMap.get("mode");
      }
  });
  this.user.name=this.fetchedUser.name;
  if (this.user.name==="") {
    this.router.navigate(['/']);
  }

  }

}
