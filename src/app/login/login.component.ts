import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='';
  password='';

  constructor() { }

  ngOnInit():void {
  }
  onLogin():void{
    console.log('USERNAME',this.username);
    console.log('PASSWORD',this.password);
  }

}