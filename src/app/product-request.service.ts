import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get("/api/productRequest/");
  }
}
