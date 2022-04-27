import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Product } from "../model/product";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  apiUrl = environment.apiBaseUrl
  hotProducts: Product[] = [];
  streamProducts: Product[] = [];

  constructor(private http: HttpClient,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.getHotProducts()
    this.getStreamProducts()
  }

  getHotProducts(): void {
    this.http.get(`${this.apiUrl}/rest/product/hot?num=32&username=${this.loginService.user.username}`)
      .subscribe(
        (data:any) => {
          if(data['success'] == true){
            this.hotProducts = data['products'];
            console.log(this.hotProducts)
          }
        },
        err => {
          console.log('Something went wrong!');
        }
      );
  }

  getStreamProducts(): void {
    this.http
      .get(`${this.apiUrl}/rest/product/stream?num=8&username=${this.loginService.user.username}`)
      .subscribe(
        (data: any) => {
          if(data['success'] == true){
            this.streamProducts = data['products']
          }
        },
        err => {
          console.log('Something went wrong!');
        }
      );
  }

}
