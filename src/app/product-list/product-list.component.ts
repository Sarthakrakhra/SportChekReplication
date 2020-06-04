import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ProductRequestService } from '../product-request.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products = new Array();
  numOfProducts = 0

  constructor(private productRequestService : ProductRequestService) { 

    this.productRequestService.getProducts().subscribe(
      res => {
        
        let columnCount = 0;
        let tempArray;
        for(let entry of res['result']){
          
          if(columnCount == 0){
            tempArray = new Array();
          }else if(columnCount == 4){
            this.products.push(tempArray);
            tempArray = new Array();
            tempArray.push(entry);
            columnCount = 1;
            this.numOfProducts++;
            continue;
          }
          tempArray.push(entry);
          columnCount++;
          this.numOfProducts++;
        }

        this.products.push(tempArray);
        console.log(this.products)
      }
    )
  }

  ngOnInit() {
  }

}
