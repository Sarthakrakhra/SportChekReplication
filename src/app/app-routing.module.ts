import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { BodyComponentComponent } from './body-component/body-component.component';

const routes: Routes = [
  {path : '', component : BodyComponentComponent},
  {path : 'product-list', component : ProductListComponent},
  {path : 'login', component : LoginPageComponent},
  {path : 'registration', component : RegistrationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [BodyComponentComponent, ProductListComponent, LoginPageComponent, RegistrationPageComponent]