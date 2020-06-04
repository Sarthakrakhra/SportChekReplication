import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserRequestService } from "../user-request.service";
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userLoginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  logout : boolean = false;

  constructor(private userRqService : UserRequestService) { }
  
  ngOnInit() {
    if(this.userRqService.isLoggedIn == true){
      this.logout = true;
    }else{
      this.logout = false;
    }
  }
  
  onLogin(){
    this.userRqService.authenticateUser(this.userLoginForm.get('username').value, this.userLoginForm.get('password').value)
    .subscribe(
      res => {
        console.log(res)
        if(res['userExists'] == true){
          alert("You are now logged in!");
          this.userRqService.setLoggedInStatus(true);
          this.logout = true;
          location.reload();
        }else{
          alert("Incorrect credentials");
          this.userRqService.setLoggedInStatus(false);
        }
      }
    );
  }

  userLogout(){
    this.userRqService.userLogout()
    .subscribe(
      res => {
        console.log(res)
        this.logout = false;
        this.userRqService.setLoggedInStatus(false);
        location.reload();
      }
    )
  }

}
