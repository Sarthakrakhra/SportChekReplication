import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPopper } from 'angular-popper';
import { SliderComponentComponent } from './slider-component/slider-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { HttpClientModule } from "@angular/common/http";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    SliderComponentComponent,
    FooterComponentComponent,
    routingComponents,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxPopper,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
