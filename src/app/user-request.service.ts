import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators/';
import { Observable } from "rxjs/"



@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');

  constructor(private http : HttpClient) { }

  postUser(username : string, password : string){
    return this.http.post("api/userRequest/newUser", {'username' : username, 'password' : password});
  }

  authenticateUser(username : string, password :string){
    return this.http.post("api/userRequest/login/", {'username' : username, 'password' : password});
  }

  checkForUsername(username : string){
    return this.http.get("api/userRequest/checkUser/" + username)
    .pipe(delay(1000));
  }

  setLoggedInStatus(val : boolean){
    this.loggedInStatus = val;
    if(this.loggedInStatus == true){
      localStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('loggedIn', 'true');
    }else{
      localStorage.removeItem('loggedIn');
      sessionStorage.removeItem('loggedIn');
    }
  }

  get isLoggedIn(){
      return JSON.parse(sessionStorage.getItem('isLoggedin') || this.loggedInStatus);
  }

  userLogout(){
    return this.http.post("api/userRequest/logout", {});
  }

  getUsername(){
    return this.http.get("api/userRequest/data");
  }
}
