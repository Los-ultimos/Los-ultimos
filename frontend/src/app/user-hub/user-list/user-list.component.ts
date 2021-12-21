import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from '../auth-data.model';
import { UserEditComponent } from '../dialogs/user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  private userSub!: Subscription

  users:AuthData[]=[];

  constructor(private authService:AuthService, public dialog: MatDialog) { }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  ngOnInit(): void {
    this.authService.getUsers()
    this.userSub = this.authService.getUsersListener()
    .subscribe((users:AuthData[])=>{
      this.users=users;
      console.log(this.users)
    })


  }

  openDialog(user:AuthData){
    let dialogRef = this.dialog.open(UserEditComponent, {
      data:user
    });

  }

  deleteUser(user:AuthData){
    this.authService.deleteUser(user)
  }



}
