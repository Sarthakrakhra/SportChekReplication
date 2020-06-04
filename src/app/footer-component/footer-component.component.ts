import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.scss']
})
export class FooterComponentComponent implements OnInit {

  isCollapsed : boolean = false;
  currentWidth : number;

  constructor(library: FaIconLibrary) { 
    library.addIcons(faEnvelope);
    library.addIcons(faFacebook, faTwitter, faInstagram, faYoutube);
  }


  ngOnInit() {
    this.currentWidth = document.documentElement.clientWidth;

    if(this.currentWidth < 767){
      this.isCollapsed = true;
    }else{
      this.isCollapsed = false;
    }
  }

  onResize(e){
    this.currentWidth = document.documentElement.clientWidth;

    if(this.currentWidth < 767){
      this.isCollapsed = true;
    }else{
      this.isCollapsed = false;
    }

  }

  toggleCollapse(e){

    if(this.isCollapsed){

      let div = e.path[1].children[1];
      if(div.className == "menu")
        div.className = "hidden";
      else
        div.className = "menu"
    }else{
      return;
    }
    
  }
}
