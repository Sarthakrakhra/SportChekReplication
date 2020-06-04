import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UserRequestService } from '../user-request.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  logout : boolean = false;
  logoutString : string = "Login";
  username : string;

  constructor(library: FaIconLibrary, private userRqService : UserRequestService) { 
    library.addIcons(faSearch);
    library.addIcons(faMapMarker);
    library.addIcons(faShoppingCart);
  }

  ngOnInit() {

      if(this.userRqService.isLoggedIn == true){
        this.logout = true;
        this.userRqService.getUsername()
        .subscribe(
          res => {
            console.log(res);
            this.username = res['user'] + " - Logout";
            this.logoutString = "Log out";
          }
        )
      }else{
        this.logout = false;
        this.username = "Sign In/Create Account";
        this.logoutString = "Log in";
      }
  }

}
