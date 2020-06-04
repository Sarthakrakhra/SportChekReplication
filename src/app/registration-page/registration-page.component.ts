import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { passwordValidator } from './validation';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UserRequestService } from "../user-request.service";



@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  userRegistrationForm : FormGroup;
  errorMessage = "Try a different username";
  validUsername = null;
  loader = false;

  constructor(private fb : FormBuilder, library: FaIconLibrary, private userRqService : UserRequestService) { 
    library.addIcons(faCheckCircle, faTimesCircle);
    this.userRegistrationForm =  this.fb.group({
      username : ['', [Validators.required, Validators.minLength(4)]],
      password : ['', Validators.required],
      confirmedPassword: ['', [Validators.required, passwordValidator]]
    });

    this.userRegistrationForm.controls.password.valueChanges.subscribe(
      event => this.userRegistrationForm.controls.confirmedPassword.updateValueAndValidity()
    )

    
  }

  ngOnInit() {
  }

  onRegister(){
    

    this.validateUsername()
    .then(
      res => {
        

        if(!res['userAvailable']){
          this.errorMessage = "Username is taken. Please try a different one!"
          this.validUsername = res['userAvailable']
        }else{
          this.validUsername = null;

          this.userRqService.postUser(this.userRegistrationForm.get('username').value, this.userRegistrationForm.get('password').value)
          .subscribe(
            res => {
              alert("Your user \""+this.userRegistrationForm.controls.username.value+"\" has been added")
              location.reload()
            }
          );
        }
        this.loader = false;
      }
    )
    .catch(
      err => {
        this.validUsername = err['validity'];
        this.errorMessage = err['message'];
        this.loader = false;
      }
    );
  }

  validateUsername(){
    this.loader = true;
    let promise = new Promise((resolve, reject) => {

      if(this.userRegistrationForm.controls.username && (this.userRegistrationForm.controls.username.value !== null || this.userRegistrationForm.controls.value !== undefined)){
        const username = this.userRegistrationForm.controls.username.value;
        let temp ={};
        
        if(username.length < 4){
          temp['message'] = "too short"
          temp['validity'] = false
          reject(temp);
        }else{
          
          this.userRqService.checkForUsername(username)
          .subscribe(
            res => {
              if(res){
                resolve(res)
              }else{
                resolve(res)
              }
            }
          );                      
        }
      }
     });

  return promise;
  }

}
