import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  apiUrl = environment.apiBaseUrl
  product: Product = new Product;
  constructor(private http:HttpClient,private router: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      var id = params['id'];
      this.getProductInfo(id);

  });


  }



  getProductInfo(id:number):void{
    this.http
      .get(`${this.apiUrl}/rest/product/info/${id}`)
      .subscribe(
        (data: any) => {
          if(data['success'] == true){
            this.product = data['product'];
            console.log(this.product)
          }
        },
        err => {
          console.log('Something went wrong!');
        }
      );
  }

}
