import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "../user-hub/auth-data.model";
import { EmailValidator } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: any;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private user:AuthData={name:"",email:"",password:"",access:""};
  private users:AuthData[]=[];
  private fetchUsers = new Subject<AuthData[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsers(){
    this.http.get<{message:string, users:AuthData[]}>("http://localhost:3000/api/user")
    .subscribe(transformedData=>{
      console.log(transformedData.users)
      this.users=transformedData.users;
      this.fetchUsers.next([...this.users])
    })


}

getUsersListener() {
  return this.fetchUsers.asObservable();
}
createUser(name: string, email: string, password: string, access:string) {
    const authData: AuthData = { name:name, email: email, password: password, access:access };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
        this.getUsers()

      });

  }

  editUser(name: string, email:string, password: string, access:string) {
    const authData: AuthData = { name:name, email: email, password: password, access:access };
    this.http
      .put("http://localhost:3000/api/user/", authData)
      .subscribe(response => {
        console.log(response);
        this.getUsers()

      });
  }

  deleteUser(user:AuthData){
    const email =user.email;
    this.http.delete("http://localhost:3000/api/user/"+email)
      .subscribe(response => {
        console.log(response);
        this.getUsers()

      });
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post<{ fetchedUser:AuthData, token: string; expiresIn: number }>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        const user = response.fetchedUser;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.user=user;
          this.saveAuthData(user, token, expirationDate);
          this.router.navigate(['/main-hub']);
        }
      });
  }

  getUser(){
    return this.user;
  }



  autoAuthUser() {
    const authInformation = this.getAuthData();
    let name="";
    let email="";
    let access="";



    if (!authInformation) {
      return;

    }
    if(authInformation){
      name=authInformation.name;
      email=authInformation.email;
      access=authInformation.access;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.user={name:name,password:"",email:email,access:access}
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(user:AuthData, token: string, expirationDate: Date) {
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userAccess", user.access);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAccess");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const access = localStorage.getItem("userAccess");

    if (!token || !expirationDate || !name || !email || !access) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      name,
      email,
      access
    }
  }
}
